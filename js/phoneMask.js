/** @format */

let keyCode;

function mask(event) {
  event.keyCode && (keyCode = event.keyCode);
  let pos = this.selectionStart;
  if (pos < 3) event.preventDefault();
  let matrix = '+38(0__) ___-__-__',
    i = 0,
    def = matrix.replace(/\D/g, ''),
    val = this.value.replace(/\D/g, ''),
    new_value = matrix.replace(/[_\d]/g, (a) => {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
  i = new_value.indexOf('_');

  if (i != -1) {
    i < 6 && (i = 18);
    new_value = new_value.slice(0, i);
  }
  let reg = matrix
    .substr(0, this.value.length)
    .replace(/_+/g, (a) => {
      return '\\d{1,' + a.length + '}';
    })
    .replace(/[+()]/g, '\\$&');
  reg = new RegExp('^' + reg + '$');
  if (
    !reg.test(this.value) ||
    this.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  )
    this.value = new_value;
  if (event.type == 'blur' && this.value.length < 5) this.value = '';
}
const input = document.querySelector('.subscribe_phone');
input.addEventListener('input', mask, false);
input.addEventListener('focus', mask, false);
input.addEventListener('blur', mask, false);
input.addEventListener('keydown', mask, false);
