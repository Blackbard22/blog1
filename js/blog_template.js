// document.addEventListener('DOMContentLoaded', function() {
//     const socialFloat = document.querySelector('.social-float');
//     const container = document.querySelector('.blog-post-container');
    
//     // Get initial positions
//     const containerRect = container.getBoundingClientRect();
//     const containerTop = containerRect.top + window.scrollY;
//     const containerBottom = containerRect.bottom + window.scrollY;
    
//     // Handle scroll event
//     window.addEventListener('scroll', function() {
//       const scrollY = window.scrollY;
//       const socialRect = socialFloat.getBoundingClientRect();
      
//       // Check if we should make it sticky
//       if (scrollY > containerTop && scrollY + socialRect.height < containerBottom) {
//         socialFloat.classList.add('sticky');
//         socialFloat.classList.remove('stop');

//         // Ensure it stays within the container's horizontal bounds
//         // socialFloat.style.left = `${containerRect.left - 100}px`;
//       } 
//       else if ( socialRect.height > containerBottom) {
//         socialFloat.classList.remove('sticky');
//         socialFloat.classList.add('stop');
//       }
//       else {
//         socialFloat.classList.remove('sticky');
//         socialFloat.classList.remove('stop');
//         // socialFloat.style.left = '-100px';
//       }
//     });
    
//     // Handle window resize
//     window.addEventListener('resize', function() {
//       const newContainerRect = container.getBoundingClientRect();
//       if (socialFloat.classList.contains('sticky')) {
//         socialFloat.style.left = `${newContainerRect.left - 100}px`;
//       }
//     });
//   });









// document.addEventListener('DOMContentLoaded', function() {
//     const socialFloat = document.querySelector('.social-float');
//     const container = document.querySelector('.blog-post-container');
    
//     function updateSocialPosition() {
//         const containerRect = container.getBoundingClientRect();
//         const socialRect = socialFloat.getBoundingClientRect();
//         const scrollY = window.scrollY;
        
//         // Calculate container boundaries
//         const containerTop = containerRect.top + window.scrollY;
//         const containerBottom = containerRect.bottom + window.scrollY;
        
//         // Calculate the point where social float should start being sticky
//         // (when container's top reaches halfway point where social would be)
//         const stickyStart = containerTop + (containerRect.height * 0.5) - (socialRect.height * 0.5);
        
//         // Calculate the point where social float should stop
//         // (container bottom minus social height)
//         const stickyEnd = containerBottom - socialRect.height;
        
//         // Calculate the fixed left position based on container
//         const fixedLeft = containerRect.left;
        
//         // If we're in the sticky range
//         if (scrollY > stickyStart && scrollY < stickyEnd) {
//             socialFloat.classList.add('sticky');
//             socialFloat.classList.remove('stop');
//             // Update position to stay aligned with container
//             socialFloat.style.left = `${fixedLeft}px`;
//             socialFloat.style.top = '50%';
//         }
//         // If we've scrolled past the end point
//         else if (scrollY >= stickyEnd) {
//             socialFloat.classList.remove('sticky');
//             socialFloat.classList.add('stop');
//             socialFloat.style.left = '0';
//             socialFloat.style.top = 'auto';
//         }
//         // If we're above the start point
//         else {
//             socialFloat.classList.remove('sticky');
//             socialFloat.classList.remove('stop');
//             socialFloat.style.left = '0';
//             socialFloat.style.top = '50%';
//         }
//     }
    
//     // Update on scroll and resize
//     window.addEventListener('scroll', updateSocialPosition);
//     window.addEventListener('resize', updateSocialPosition);
    
//     // Initial position update
//     updateSocialPosition();
// });