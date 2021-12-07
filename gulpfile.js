const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imágenes
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

function css(done) {
    //Identificar el archivo .SCSS a compilar
    src('src/scss/**/*.scss')//manda a identificar el (archivo), 
        .pipe( plumber() )
        .pipe( sass() ) //y una vez que finaliza, con pipe manda a llamar a la sig acción --Compilarlo
        .pipe( dest('build/css') )  //Almacenarlo en el disco duro
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png, jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png, jpg}')
        .pipe( webp(opciones) ) //convierte
        .pipe( dest('build/img') ) //almacena las convertidas
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css); //que escuche por cambios en este 'archivo' y que después mande a llamar a la función de css.
    done();
}


exports.css = css; 
exports.imagenes= imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel( imagenes, versionWebp, dev );