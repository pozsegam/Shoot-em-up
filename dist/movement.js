export let inputDirection = { x: 0, y: 0 };
window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      inputDirection.x = 5;

      break;

    case 37:
      inputDirection.x = -5;
      break;
    case 40:
      inputDirection.y = 5;
      break;
    case 38:
      inputDirection.y = -5;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 39:
      inputDirection.x = 0;
      break;
    case 37:
      inputDirection.x = 0;
      break;
    case 40:
      inputDirection.y = 0;
      break;
    case 38:
      inputDirection.y = 0;
      break;
  }
});
