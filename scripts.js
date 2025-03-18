// Get all the sections
const sections = document.querySelectorAll('.section');
const progressBar = document.createElement('div');
progressBar.id = "progress-bar-filled";
document.getElementById('progress-bar').appendChild(progressBar);

// Function to update the progress bar as the user scrolls
function updateProgressBar() {
  const scrollPosition = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollPosition / docHeight) * 100;
  progressBar.style.height = scrollPercent + '%';
}

// Listen for scroll events to update the progress bar
window.addEventListener('scroll', updateProgressBar);

// Smooth scroll behavior for the sidebar links
document.querySelectorAll('.bubble').forEach(bubble => {
  bubble.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth',
    });
  });
});
