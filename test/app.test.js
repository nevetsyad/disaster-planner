const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('app.js', 'utf8');
function setup() {
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  dom.window.eval(script);
  return dom;
}
const normalTitles = ['The “It’s Just Weather” Protocol', 'The “Drop, Cover, Hold On”-ish Protocol', 'The “Become a Houseplant” Protocol', 'The “Very Unlikely, But Okay” Protocol'];
const proTitles = ['Operation: Circulate the Weather Memo', 'Operation: Rebaseline the Floor', 'Operation: Escalate the Thermostat', 'Operation: Continuity of Meetings'];
const keys = ['storm', 'quake', 'heat', 'zombie'];

test('normal startup, button semantics, and always-visible fictional disclaimer', () => {
  const dom = setup(); const d = dom.window.document;
  assert.equal(d.querySelector('#plan-title').textContent, normalTitles[0]);
  assert.equal(d.querySelector('#pro-mode').getAttribute('aria-pressed'), 'false');
  assert.match(d.querySelector('.fiction-notice').textContent, /not affiliated.*Not emergency guidance/);
  assert.equal(d.querySelector('.scenario-grid').getAttribute('role'), 'group');
  for (const button of d.querySelectorAll('.scenario-card')) {
    assert.equal(button.tagName, 'BUTTON');
    assert.equal(button.getAttribute('role'), null);
    assert.equal(button.tabIndex, 0);
  }
  dom.window.close();
});

for (const [index, key] of keys.entries()) {
  test(`${key}: complete normal/pro plans, selected state, exact normal restoration, retained checklist and focus`, () => {
    const dom = setup(); const d = dom.window.document;
    const toggle = d.querySelector('#pro-mode');
    const card = d.querySelector(`[data-scenario="${key}"]`);
    card.click();
    const normalPlan = d.querySelector('.plan-output').innerHTML;
    const normalHero = d.querySelector('.hero-copy').innerHTML;
    const check = d.querySelector('.task input');
    check.click();
    toggle.focus(); toggle.click();
    assert.equal(d.activeElement, toggle);
    assert.equal(toggle.getAttribute('aria-pressed'), 'true');
    assert.equal(d.body.classList.contains('pro-mode'), true);
    assert.equal(d.querySelector('#plan-title').textContent, proTitles[index]);
    assert.match(d.querySelector('.hero-dek').textContent, /fictional Federal Bureau/);
    assert.match(d.querySelector('#mode-announcement').textContent, /Pro Mode.*enabled/);
    assert.equal(d.querySelectorAll('.scenario-card[aria-pressed="true"]').length, 1);
    assert.equal(card.getAttribute('aria-pressed'), 'true');
    assert.equal(d.querySelectorAll('#first-steps li').length, 3);
    assert.equal(d.querySelectorAll('#pack-list span').length, 4);
    for (const selector of ['#plan-intro', '#field-note', '#readiness-label', '#confidence-value']) {
      assert.ok(d.querySelector(selector).textContent.trim());
    }
    assert.equal(check.checked, true);
    assert.equal(d.querySelector('#progress-text').textContent, '1 / 5 DONE');
    toggle.click();
    assert.equal(d.querySelector('.plan-output').innerHTML, normalPlan);
    assert.equal(d.querySelector('.hero-copy').innerHTML, normalHero);
    assert.equal(d.body.classList.contains('pro-mode'), false);
    assert.equal(toggle.getAttribute('aria-pressed'), 'false');
    assert.equal(check.checked, true);
    dom.window.close();
  });
}

test('regenerate reaches every alternative scenario in both modes and retains checklist', () => {
  const dom = setup(); const d = dom.window.document;
  d.querySelectorAll('.task input').forEach(input => input.click());
  for (let mode = 0; mode < 2; mode++) {
    for (const key of keys) {
      const alternatives = keys.filter(other => other !== key);
      for (let i = 0; i < 3; i++) {
        d.querySelector(`[data-scenario="${key}"]`).click();
        dom.window.Math.random = () => (i + 0.5) / 3;
        d.querySelector('#reroll').click();
        assert.equal(d.querySelector('.scenario-card[aria-pressed="true"]').dataset.scenario, alternatives[i]);
        assert.equal(d.querySelector('#plan-title').textContent, (mode ? proTitles : normalTitles)[keys.indexOf(alternatives[i])]);
        assert.equal(d.querySelector('#progress-text').textContent, '5 / 5 DONE');
      }
    }
    d.querySelector('#pro-mode').click();
  }
  d.querySelectorAll('.task input').forEach(input => input.click());
  assert.equal(d.querySelector('#progress-text').textContent, '0 / 5 DONE');
  dom.window.close();
});

test('native checklist remains focusable, labeled, and visually focus-indicated', () => {
  const dom = setup(); const d = dom.window.document;
  for (const input of d.querySelectorAll('.task input')) {
    assert.equal(input.type, 'checkbox');
    assert.ok(input.labels[0].textContent.trim());
    input.focus(); assert.equal(d.activeElement, input);
  }
  const css = fs.readFileSync('styles.css', 'utf8');
  assert.doesNotMatch(css, /\.task input\s*\{[^}]*display:\s*none/);
  assert.match(css, /\.task:focus-within/);
  assert.match(css, /prefers-reduced-motion/);
  dom.window.close();
});
