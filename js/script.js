document.addEventListener("DOMContentLoaded", function () {
    fetch('data/data.yml')
        .then(response => response.text())
        .then(yamlText => {
            const data = jsyaml.load(yamlText);
            populateData(data);
        })
        .catch(error => console.error('Error fetching YAML:', error));

    const today_date = new Date();

    function date_to_string(date) {
        return ((date.getTime() === today_date.getTime()) ? 'Present' : ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear().toString());
    }

    function populateData(data) {
        // Heading
        let heading = `
          <div id="my_name">${data.name}</div>
          <div class="info-item">
              <span class="info-label"><i class="fa fa-location-arrow"></i></span>
              <span class="info-text">${data.location}</span>
          </div>
          <div class="info-item">
              <span class="info-label"><i class="fab fa-linkedin"></i></span>
              <span class="info-text"><a href="${data.linkedin.url}" target="_blank">${data.linkedin.text}</a></span>
          </div>
          <div class="info-item">
              ${data.website.map(website => `
                  <span class="info-label"><i class="fa fa-globe"></i></span>
                  <span class="info-text"><a href="${website.url}" target="_blank">${website.text}</a></span>
              `).join(' ')}
          </div>
          <div id="contact-info" class="info-item" hidden>
              <span class="info-label"><i class="fa fa-envelope"></i></span>
              <span id="info-email" class="editible-input info-text">@gmail.com</span>
              <span class="info-label"><i class="fa fa-phone"></i></span>
              <span id="info-phone" class="editible-input info-text">+977-98</span>
          </div>`;
        document.getElementById('heading').innerHTML = heading;

        // About Me
        document.getElementById('about-me').innerText = data.about;

        // Work Experiences
        let workExperiencesHTML = '';
        data['work-experiences'].forEach(work => {
            let experiencesHTML = '';
            work.experiences.forEach(experience => {
                let responsibilitiesHTML = experience.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('');
                experiencesHTML += `
                  <h2>${work.entity} - ${work.location}</h2>
                  <div class="heading3"><strong>${experience.title_name}</strong></div>
                  <div class="highlight">${date_to_string(new Date(experience.start)).toUpperCase()} – ${date_to_string(new Date(experience.end || today_date)).toUpperCase()}</div>
                  <ul>${responsibilitiesHTML}</ul>`;
            });
            workExperiencesHTML += `<div class="items">${experiencesHTML}</div>`;
        });
        document.getElementById('work_experiences').innerHTML = workExperiencesHTML;

        // Academic Qualifications
        let academicQualificationsHTML = '';
        data['academic-qualifications'].forEach(qualification => {
            let educationsHTML = '';
            qualification.educations.forEach(education => {
                let studiesHTML = education.studies.map(study => `
                  <div class="heading3"><strong>${study.study_name}</strong></div>
                  <div class="highlight">${date_to_string(new Date(study.start)).toUpperCase()} – ${date_to_string(new Date(study.end || today_date)).toUpperCase()}</div>
              `).join('');
                educationsHTML += studiesHTML;
            });
            academicQualificationsHTML += `<div class="items"><h2>${qualification.entity} - ${qualification.location}</h2>${educationsHTML}</div>`;
        });
        document.getElementById('academic_qualifications').innerHTML = academicQualificationsHTML;

        // Skills
        let skillsHTML = Object.entries(data.skills).map(([skillName, skillObject]) => `
          <p>
              <span class="heading3">${skillName}</span> - 
              <span class="highlight">${skillObject.sub_skills.join(" · ").toUpperCase()}</span>
          </p>`).join('');
        document.getElementById('skills').innerHTML = skillsHTML;
    }
});
