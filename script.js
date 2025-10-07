// Elements
const form = document.getElementById('memberForm');
const fullName = document.getElementById('fullName');
const dob = document.getElementById('dob');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const nextBtn = document.getElementById('nextBtn');

// Local storage key
const STORAGE_KEY = 'newMemberForm';

// Small validators
function validEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function validPhone(v){
  return /^[0-9+()\- \s]{6,}$/.test(v);
}

// Load stored data and prefill
document.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw){
    try{
      const obj = JSON.parse(raw);
      if (obj.fullName) fullName.value = obj.fullName;
      if (obj.dob) dob.value = obj.dob;
      if (obj.email) email.value = obj.email;
      if (obj.phone) phone.value = obj.phone;
    }catch(e){
      console.error('load error', e);
    }
  }

  // small entrance animation: delay on card children
  requestAnimationFrame(() => {
    document.querySelectorAll('.card > *').forEach((el, i) => {
      el.style.transition = 'transform 420ms ease, opacity 420ms ease';
      el.style.transform = 'translateY(8px)';
      el.style.opacity = '0';
      setTimeout(()=>{ el.style.transform='translateY(0)'; el.style.opacity='1' }, 120 + i*40);
    });
  });
});

// Show hint text
function setHint(fieldEl, message){
  const hint = document.querySelector(`.hint[data-for="${fieldEl.id}"]`);
  if (!hint) return;
  if (message){
    hint.textContent = message;
    hint.classList.add('show');
  }else{
    hint.textContent = '';
    hint.classList.remove('show');
  }
}

// Form validation. Returns true if valid.
function validate(){
  let ok = true;
  // full name
  if (!fullName.value.trim()){
    setHint(fullName, 'Full name is required');
    ok = false;
  } else {
    setHint(fullName, '');
  }

  // dob
  if (!dob.value){
    setHint(dob, 'Date of birth is required');
    ok = false;
  } else {
    setHint(dob, '');
  }

  // email
  if (!email.value.trim() || !validEmail(email.value.trim())){
    setHint(email, 'Enter a valid email');
    ok = false;
  } else {
    setHint(email, '');
  }

  // phone
  if (!phone.value.trim() || !validPhone(phone.value.trim())){
    setHint(phone, 'Enter a valid phone number');
    ok = false;
  } else {
    setHint(phone, '');
  }

  return ok;
}

// Save to localStorage
function saveData(){
  const payload = {
    fullName: fullName.value.trim(),
    dob: dob.value,
    email: email.value.trim(),
    phone: phone.value.trim(),
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
function showSuccess(){
  nextBtn.classList.add('ripple');
  
  setTimeout(()=> nextBtn.classList.remove('ripple'), 520);

  nextBtn.classList.add('success');

  setTimeout(()=> nextBtn.classList.remove('success'), 1400);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validate()) return;

  saveData();
  showSuccess();
function clearPersonalFields() {
  fullName.value = '';
  dob.value = '';
  email.value = '';
  phone.value = '';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validate()) return;

  saveData();
  showSuccess();

  // Clear the inputs
  clearPersonalFields();

  setTimeout(() => {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '14%';
    el.style.transform = 'translateX(-50%)';
    el.style.background = '#0a8f4a';
    el.style.color = '#fff';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '8px';
    el.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)';
    el.textContent = 'Member saved';
    document.body.appendChild(el);

    setTimeout(() => el.style.opacity = '0', 900);
    setTimeout(() => {
      document.body.removeChild(el);
      window.location.href = 'eduform.html';
    }, 1400);

  }, 520);
});

  setTimeout(() => {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '14%';
    el.style.transform = 'translateX(-50%)';
    el.style.background = '#0a8f4a';
    el.style.color = '#fff';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '8px';
    el.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)';
    el.textContent = 'Member saved';
    document.body.appendChild(el);

    setTimeout(() => el.style.opacity = '0', 900);
    setTimeout(() => {
      document.body.removeChild(el);
      window.location.href = 'eduform.html';
    }, 1400);

  }, 520);
});

