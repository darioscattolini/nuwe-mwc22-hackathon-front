# Reto Hackathon Mobile World Congress 2022

> Aplicación parcial desarrollada con Angular para cumplir con el reto front-end 
> de la preselección para la Hackathon del Mobile World Congress 2022.

## Objetivos

El reto plantea las siguientes tareas:

* Formulario que permita introducir los siguientes datos: correo electrónico, 
  nombre completo, breve descripción, país y ciudad de residencia.
* Generar un avatar de la persona de forma aleatoria (puede ser utilizando una 
  API, colores, etc).
* Formulario que permita introducir datos profesionales: años de experiencia, 
  sector (Front, Back, Mobile o Data), skills: (se pueden añadir de forma 
  libre).
* Las skills salen en formato tag en alguna parte del perfil.
* Una vista que permita ver todo el perfil de user con los datos anteriores.

## Demostración

En este enlace [se puede visualizar la aplicación y evaluar su
funcionamiento](https://darioscattolini.github.io/nuwe-mwc22-hackathon-front/).

## Sobre la aplicación

La aplicación consiste básicamente en una barra de navegación y un módulo
dedicado al registro y el login de usuarios. Si el usuario no está logueado la
barra de navegación muestra un link al componente de login. 

Este componente contiene un enlace a la página de registro, al que el usuario
deberá acceder en caso de no estar registrado. Si intenta hacer un login antes
de registrarse se simulará una respuesta de login exitoso por parte del
servidor, la cual contendrá datos de un usuario ficticio. 

Si el usuario opta por hacer el registro, se abrirá un componente de tipo Wizard
que permitirá hacer el registro en tres pasos. Primero el usuario introducirá
sus datos personales, luego escogerá su ávatar, y finalmente añadirá sus datos
profesionales. Al culminar el registro se iniciará automáticamente una sesión
con los datos proporcionados.

Al estar logueado el usuario el enlace en la barra de navegación se modificará.
Ahora muestra el nombre y el avatar del usuario, y permite acceder a un menú
dropdown con dos opciones: un enlace al perfil del usuario, donde todos los
datos introducidos se muestran en una suerte de dashboard, y un enlace que
permite desloguearse.

## Instalación

En primer lugar es necesario clonar el repositorio e instalar las dependencias
con `npm`:

```shell
git clone https://github.com/darioscattolini/minimal-checkout.git
npm install
```

El comando `ng serve` de la CLI de Angular monta un servidor local desde el cual
se puede visualizar el proyecto. Se trata de un servidor de desarrollo, que
recarga automáticamente la aplicación ante cambios en el código fuente. Puede
accederse a él desde el explorador web, en la dirección`http://localhost:4200/`.

[La documentación de Angular](https://angular.io/) contiene más información
sobre el framework para quienes estén interesados en trabajar en un fork del
proyecto.

## Enfoque y tecnologías adoptados

Para cumplir con la consigna de la Hackathon he elegido el framework
[Angular](https://angular.io/) por estar más familiarizado con él y porque
contiene funcionalidades útiles para la construcción y validación de
formularios.

He utilizado también la librería [Clarity Design
System](https://clarity.design/), que incluye componentes especiales para
Angular. Esta librería resuelve varias cuestiones de diseño, y fue escogida
particularmente por el componente Wizard que permite estructurar el registro del
usuario en tres pasos, que me pareció una forma conveniente de cumplir con las
consignas del reto.

Para la generación de avatars he empleado la API de [DiceBear
Avatars](https://avatars.dicebear.com/). Utilizo la función `Math.random()` para
generar semillas que son añadidas al endpoint de la API, la cual devuelve un
avatar en formato svg.

Para la obtención de los nombres y códigos de paíes se utiliza la API [REST
Countries](https://restcountries.com/).

Al tratarse de un reto sencillo no se requirió demasiado diseño para la
arquitectura de la aplicación. Sin embargo, anticipando un ulterior desarrollo y
escalabilidad he decidido dividirla en dos módulos de Angular: `LayoutModule`
contiene los componentes que estructuran el layout de la aplicación (por el
momento sólo la barra de navegación), y `UserModule` los componentes, modelos y
servicios requeridos para la autenticación de los usuarios.

## Licencia

[MIT](https://opensource.org/licenses/MIT)