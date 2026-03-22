const input = document.getElementById('inputNumber');
const button = document.getElementById('generateButton');
const result = document.getElementById('result');

const collatzSequence = (n) => {
  const sequence = [n];
  let oddNumberAmount = 0; // Start with 0 to count odd numbers

  if (n === 1) {
    n = 3 * n + 1;
    sequence.push(n);
  }

  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
      oddNumberAmount++;
    }
    sequence.push(n);
  }
  return { sequence, oddNumberAmount };
}

button.addEventListener('click', () => {
  const number = parseInt(input.value);
  if (isNaN(number) || number < 1 || number > 1000) {
    console.error('Please enter a valid number between 1 and 1000.');
    alert('Please enter a valid number between 1 and 1000.');
    return;
  }

  const { sequence, oddNumberAmount } = collatzSequence(number);

  result.innerHTML = `
  <h2>Collatz Sequence for ${number}</h2>
  <p>${sequence.join(', ')}</p>
  <p>Total steps: ${sequence.length - 1}</p>
  <p>Odd numbers appart from 1: ${oddNumberAmount}</p>
  <div class="grid-container">
    ${sequence.map(num => `
      <div class="grid-item">
        <p>${num}</p>
      </div>
      `).join('')}
  </div>
  `;

  let hue = 0;

  for (item of document.getElementsByClassName('grid-item')) {
    item.style.backgroundColor = `hsl(${hue}, 100%, 80%)`;

    let oddNotOne = 0;

    if (parseInt(item.textContent) % 2 !== 0) {
      hue = hue + 30; // Increment hue for odd numbers
      oddNotOne++;
      };

    if (parseInt(item.textContent) === 1) {
      hue = hue - 30
      oddNotOne--;
      };
    
    item.innerHTML += `<p>Branch ${oddNumberAmount - (hue /30) + oddNotOne}</p>`;
    }
  });