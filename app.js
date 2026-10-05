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

let currentScenario = 'storm';
const $ = (selector) => document.querySelector(selector);

function renderPlan(key) {
  const plan = plans[key];
  currentScenario = key;
  $('#plan-title').textContent = plan.title;
  $('#plan-intro').textContent = plan.intro;
  $('#confidence-value').textContent = `${plan.confidence}%`;
  $('#readiness-label').textContent = plan.readinessLabel;
  $('#readiness-bar').style.width = `${plan.readiness}%`;
  $('#field-note').textContent = plan.note;
  $('#first-steps').innerHTML = plan.steps.map(step => `<li>${step}</li>`).join('');
  $('#pack-list').innerHTML = plan.pack.map(item => `<span>${item}</span>`).join('');
  document.querySelectorAll('.scenario-card').forEach(card => card.classList.toggle('active', card.dataset.scenario === key));
}

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
