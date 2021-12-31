//fichier comprenant les fonctions de vérification des inputs des users
function validEmail(value) {
  const regexEmail =
    /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
  return regexEmail.test(value);
}
function validPassword(value) {
  //8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial
  const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  return regexPassword.test(value);
}
function validUsername(value) {
  const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  return usernameRegex.test(value);
}
// const verifInput = validUsername(); validPassword(); validEmail() ;
export default { validUsername, validPassword, validEmail };
