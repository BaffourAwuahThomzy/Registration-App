 const personal = JSON.parse(localStorage.getItem('newMemberForm')) || {};
    const education = JSON.parse(localStorage.getItem('newMemberEducation')) || {};
    const job = JSON.parse(localStorage.getItem('newMemberJob')) || {};

    const container = document.getElementById('profile');
    container.innerHTML = `
      <h3>Personal Info</h3>
      <p><b>Name:</b> ${personal.fullName || ''}</p>
      <p><b>DOB:</b> ${personal.dob || ''}</p>
      <p><b>Email:</b> ${personal.email || ''}</p>
      <p><b>Phone:</b> ${personal.phone || ''}</p>

      <h3>Education</h3>
      <p><b>Qualification:</b> ${education.qualification || ''}</p>
      <p><b>Field of Study:</b> ${education.fieldStudy || ''}</p>
      <p><b>Institution:</b> ${education.institution || ''}</p>
      <p><b>ID No:</b> ${education.idNo || ''}</p>

      <h3>Job</h3>
      <p><b>Job Title:</b> ${job.jobTitle || ''}</p>
      <p><b>Role:</b> ${job.role || ''}</p>
      <p><b>Branch:</b> ${job.branch || ''}</p>

      <h3>Profile Image</h3>
      ${job.profileImage ? `<img src="${job.profileImage}" style="width:200px;border-radius:8px;">` : '<p>No image</p>'}
    `;
