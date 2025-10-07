// --------- Step 2 (Education) ---------
const STORAGE_KEY_EDU = 'newMemberEducation';
const eduForm = document.getElementById('eduForm');

if (eduForm) {
  const qualification = document.getElementById('qualification');
  const fieldStudy = document.getElementById('fieldStudy');
  const institution = document.getElementById('institution');
  const idNo = document.getElementById('idNo');
  const nextBtn = document.getElementById('nextBtn');

  function setHint(el, msg) {
    const h = document.querySelector(`.hint[data-for="${el.id}"]`);
    if (msg) { h.textContent = msg; h.classList.add('show'); }
    else { h.textContent = ''; h.classList.remove('show'); }
  }

  function validateEdu() {
    let ok = true;
    if (!qualification.value.trim()) { setHint(qualification, 'Qualification required'); ok = false; } else setHint(qualification, '');
    if (!fieldStudy.value.trim()) { setHint(fieldStudy, 'Field of Study required'); ok = false; } else setHint(fieldStudy, '');
    if (!institution.value.trim()) { setHint(institution, 'Institution required'); ok = false; } else setHint(institution, '');
    if (!idNo.value.trim()) { setHint(idNo, 'Valid ID required'); ok = false; } else setHint(idNo, '');
    return ok;
  }

  function saveEdu() {
    const payload = {
      qualification: qualification.value.trim(),
      fieldStudy: fieldStudy.value.trim(),
      institution: institution.value.trim(),
      idNo: idNo.value.trim(),
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_EDU, JSON.stringify(payload));
  }

  eduForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateEdu()) return;
    saveEdu();
    window.location.href = 'job.html';
  });
}
const STORAGE_KEY_JOB = 'newMemberJob';
const jobForm = document.getElementById('jobForm');

if (jobForm) {
  const jobTitle = document.getElementById('jobTitle');
  const role = document.getElementById('role');
  const branch = document.getElementById('branch');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const finishBtn = document.getElementById('finishBtn');

  let videoStream;

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoStream = stream;

      const video = document.createElement('video');
      video.autoplay = true;
      video.srcObject = stream;
      video.style.width = "220px";
      video.style.borderRadius = "8px";
      document.body.appendChild(video);
      return video;
    } catch (err) {
      alert("Camera access denied: " + err.message);
      return null;
    }
  }

  function captureImage(video) {
    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  }

  function validPassword(pwd) {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  }

  function setHint(el, msg) {
    const h = document.querySelector(`.hint[data-for="${el.id}"]`);
    if (msg) { h.textContent = msg; h.classList.add('show'); }
    else { h.textContent = ''; h.classList.remove('show'); }
  }

  function validateJob() {
    let ok = true;
    if (!jobTitle.value.trim()) { setHint(jobTitle, 'Job title required'); ok = false; } else setHint(jobTitle, '');
    if (!role.value.trim()) { setHint(role, 'Role required'); ok = false; } else setHint(role, '');
    if (!branch.value.trim()) { setHint(branch, 'Branch required'); ok = false; } else setHint(branch, '');
    if (!password.value.trim() || !validPassword(password.value)) {
      setHint(password, 'Password must be 8+ chars, 1 uppercase, 1 number, 1 special');
      ok = false;
    } else setHint(password, '');
    if (confirmPassword.value !== password.value) { setHint(confirmPassword, 'Passwords must match'); ok = false; } else setHint(confirmPassword, '');
    return ok;
  }

  function saveJob(photo) {
    const payload = {
      jobTitle: jobTitle.value.trim(),
      role: role.value.trim(),
      branch: branch.value.trim(),
      password: password.value.trim(),
      profileImage: photo || null,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_JOB, JSON.stringify(payload));
  }

  jobForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateJob()) return;

    const video = await startCamera();
    if (!video) return;

    setTimeout(() => {
      const photo = captureImage(video);
      videoStream.getTracks().forEach(track => track.stop());
      video.remove();

      saveJob(photo);

      alert('✅ Member registration complete!');
      window.location.href = 'profile.html';
    }, 2000);
  });
}
function clearEduFields() {
  qualification.value = '';
  fieldStudy.value = '';
  institution.value = '';
  idNo.value = '';
}

eduForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateEdu()) return;

  saveEdu();
  showSuccess();

  clearEduFields();

  setTimeout(() => {
    window.location.href = 'job.html';
  }, 600);
});
