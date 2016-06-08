var curso = "selenium";

var wsOptions = {
  alura: process.env.ALURA_URL,
  path: process.env.ALURA_PATH,
  hash: process.env.ALURA_HASH,

  courses: {
    module1: curso
    // ,
    // module2: "php-mysql-e-fundamentos-da-web-parte-2",
    // module3: "codeigniter"
  },
  //Optional: Name for the full-course 
  courseName: curso
}

module.exports = wsOptions;