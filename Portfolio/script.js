


// Animate Skills
window.addEventListener('scroll', () => {
  const skills = document.querySelectorAll('.skill-level');
  const triggerBottom = window.innerHeight * 0.8;

  skills.forEach(skill => {
    const skillTop = skill.getBoundingClientRect().top;
    if(skillTop < triggerBottom) {
      const level = skill.getAttribute('data-skill');
      skill.style.width = level + '%';
    }
  });
});
