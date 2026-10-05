const plans = {
  storm: {
    title: 'The “It’s Just Weather” Protocol', confidence: 87, readiness: 72, readinessLabel: 'pretty decent',
    intro: 'For when the sky gets dramatic and your neighbor starts texting in all caps.',
    steps: ['Fill every water bottle you own.', 'Bring in anything that could become airborne.', 'Text your emergency contact: “all good, probably.”'],
    pack: ['🔦 Flashlight', '🥜 Emergency snack', '📻 Radio (for vibes)', '🧦 One morale sock'],
    note: 'If the forecast says “gusty,” secure the patio furniture before it achieves its dream of becoming a boat.'
  },
  quake: {
    title: 'The “Drop, Cover, Hold On”-ish Protocol', confidence: 91, readiness: 64, readinessLabel: 'structurally optimistic',
    intro: 'For when the furniture starts freelancing and the floor has a brief identity crisis.',
    steps: ['Find the sturdy table that is not covered in laundry.', 'Move breakables away from your head and your cat.', 'Afterward, check for gas smells and avoid the elevator.'],
    pack: ['💧 Water', '🔦 Flashlight', '🩹 Tiny first-aid kit', '🧤 Sturdy gloves'],
    note: 'Your bookcase is not a load-bearing wall. It is, however, extremely committed to falling over.'
  },
  heat: {
    title: 'The “Become a Houseplant” Protocol', confidence: 83, readiness: 78, readinessLabel: 'shade-seeking',
    intro: 'For when going outside feels like entering a preheated air fryer.',
    steps: ['Drink water before you feel thirsty.', 'Close blinds on the sunny side of the house.', 'Check in on neighbors, pets, and anyone wearing black denim.'],
    pack: ['🧴 Sunscreen', '🧊 Ice pack', '🧢 Hat', '🥤 Water bottle'],
    note: 'If the pavement is hot enough to cook an egg, it is also hot enough to ruin your “quick little walk.”'
  },
  zombie: {
    title: 'The “Very Unlikely, But Okay” Protocol', confidence: 42, readiness: 35, readinessLabel: 'emotionally prepared',
    intro: 'For when the group chat goes silent and someone on the street is moving suspiciously slowly.',
    steps: ['Lock doors. This is still good advice.', 'Choose a meeting point that is not the mall.', 'Inventory snacks, tools, and your friend with the practical car.'],
    pack: ['🔦 Flashlight', '🥫 Canned food', '🗺️ Paper map', '🎧 One confidence playlist'],
    note: 'The odds are low. The value of having a plan is weirdly high. Also, do not investigate the basement noise.'
  }
};

// A made-up office, not a representation of any real federal agency.
const proPlans = {
  storm: {
    title: 'Operation: Circulate the Weather Memo', confidence: 87, readiness: 72, readinessLabel: 'pending concurrence',
    intro: 'The fictional Federal Bureau of Contingency Paperwork has upgraded the sky from “noted” to “reply-all.”',
    steps: ['Convene the Wind Alignment Working Group; invite the wind as an optional attendee.', 'Route the patio-furniture inventory through three fictional approval chains.', 'Draft a situation report confirming that the situation continues to be a situation.'],
    pack: ['📋 Waterproof org chart', '📻 Radio + talking points', '🥜 Meeting-length snacks', '📎 Emergency binder clips'],
    note: 'The storm declined your calendar invitation. Record this as an interdepartmental coordination challenge.'
  },
  quake: {
    title: 'Operation: Rebaseline the Floor', confidence: 91, readiness: 64, readinessLabel: 'under structural review',
    intro: 'The fictional bureau regrets that the ground implemented a major change without a steering committee.',
    steps: ['Log the tectonic shift as an unplanned facilities enhancement.', 'Schedule a lessons-learned meeting about the meeting that moved six inches.', 'Issue a fictional memo clarifying that “agile workspace” was not a literal instruction.'],
    pack: ['📋 Change-control log', '🖊️ Gravity-tested pen', '📎 Seismic binder clips', '🍪 Continuity cookies'],
    note: 'The fault line has no designated point of contact. Procurement is investigating whether it qualifies as a sole-source vendor.'
  },
  heat: {
    title: 'Operation: Escalate the Thermostat', confidence: 83, readiness: 78, readinessLabel: 'cooling request received',
    intro: 'The fictional bureau has discovered that the sun is operating outside its agreed service-level targets.',
    steps: ['Submit a fictional cooling request marked “warm regards.”', 'Rename the overheated conference room the Thermal Innovation Suite.', 'Publish a dashboard showing 100% completion of identifying that it is hot.'],
    pack: ['🪭 Foldable policy memo', '🥤 Hydration deliverable', '🧢 Committee-approved hat', '🧊 Ice with a tracking number'],
    note: 'A desk fan is not an interagency strategy, but it has delivered more measurable outcomes this afternoon.'
  },
  zombie: {
    title: 'Operation: Continuity of Meetings', confidence: 42, readiness: 35, readinessLabel: 'quorum uncertain',
    intro: 'A strictly fictional exercise: the undead have arrived, and somehow the recurring meeting survived too.',
    steps: ['Determine whether “braaains” constitutes actionable stakeholder feedback.', 'Update the fictional org chart to distinguish acting directors from actually living directors.', 'Archive the exercise report under “unlikely events, predictable paperwork.”'],
    pack: ['🗂️ Succession-plan binder', '🥫 Shelf-stable donuts', '🪪 Fictional visitor badges', '🔋 Conference-call battery'],
    note: 'Exercise only. No actual zombies, federal directives, or emergency procurement authority are included with Pro Mode.'
  }
};

let currentScenario = 'storm';
let proMode = false;
const $ = (selector) => document.querySelector(selector);
// Capture original copy so leaving Pro Mode restores it exactly.
const copyTargets = ['.hero-copy .eyebrow', '.hero h1', '.hero-dek', '.planner .section-heading .eyebrow', '.planner .section-heading h2', '.planner .section-heading>p:last-child', '.panel-top .eyebrow', '.plan-columns h3', '.plan-columns>div:last-child h3', '#confidence-heading', '#readiness-heading', '.tape', '.checklist .eyebrow', '.checklist h2', '.board-header>span:first-child'];
const normalCopy = copyTargets.map(selector => $(selector).innerHTML);
const proCopy = [
  'FEDERAL AGENCY EDITION <span>fictional / v1.0</span>',
  'When nature says<br><em>“surprise,”</em> say<br><strong>“Please use Form 27-B.”</strong>',
  'Welcome to the fictional Federal Bureau of Contingency Paperwork. Turning natural disasters into calendar invitations since approximately this morning.',
  '01 / CLASSIFY THE INCONVENIENCE', 'Pick your incident.',
  'Four scenarios. Infinite stakeholders. Absolutely no actual federal authority.',
  '02 / FICTIONAL AGENCY ACTION MEMO', 'Route for concurrence', 'Pack the field-office bag',
  'MEMO CONFIDENCE', 'Paperwork-ish readiness', 'DESK MEMO',
  '03 / PERSONAL PREP, EVEN IN PRO MODE', 'Same basics. More paperwork.', 'PERSONAL PREP TASKS'
];

function renderPlan(key) {
  const plan = (proMode ? proPlans : plans)[key];
  currentScenario = key;
  $('#plan-title').textContent = plan.title;
  $('#plan-intro').textContent = plan.intro;
  $('#confidence-value').textContent = `${plan.confidence}%`;
  $('#readiness-label').textContent = plan.readinessLabel;
  $('#readiness-bar').style.width = `${plan.readiness}%`;
  $('#field-note').textContent = plan.note;
  $('#first-steps').replaceChildren(...plan.steps.map(step => {
    const item = document.createElement('li'); item.textContent = step; return item;
  }));
  $('#pack-list').replaceChildren(...plan.pack.map(text => {
    const item = document.createElement('span'); item.textContent = text; return item;
  }));
  document.querySelectorAll('.scenario-card').forEach(card => {
    const active = card.dataset.scenario === key;
    card.classList.toggle('active', active);
    card.setAttribute('aria-pressed', String(active));
  });
}

$('#pro-mode').addEventListener('click', () => {
  proMode = !proMode;
  document.body.classList.toggle('pro-mode', proMode);
  $('#pro-mode').setAttribute('aria-pressed', String(proMode));
  copyTargets.forEach((selector, index) => { $(selector).innerHTML = (proMode ? proCopy : normalCopy)[index]; });
  $('#mode-description').textContent = proMode
    ? 'Pro Mode · Federal Agency Edition · Fictional bureau, very real bureaucracy jokes.'
    : 'Normal mode · Personal prep, questionable confidence.';
  $('#mode-announcement').textContent = `${proMode ? 'Pro Mode, fictional Federal Agency Edition' : 'Normal mode'} enabled. Scenario and checklist progress kept.`;
  renderPlan(currentScenario);
});

document.querySelectorAll('.scenario-card').forEach(card => {
  card.addEventListener('click', () => renderPlan(card.dataset.scenario));
});

$('#reroll').addEventListener('click', () => {
  const keys = Object.keys(plans).filter(key => key !== currentScenario);
  renderPlan(keys[Math.floor(Math.random() * keys.length)]);
});

document.querySelectorAll('.task input').forEach(input => {
  input.addEventListener('change', () => {
    const done = document.querySelectorAll('.task input:checked').length;
    $('#progress-text').textContent = `${done} / 5 DONE`;
  });
});
renderPlan(currentScenario);
