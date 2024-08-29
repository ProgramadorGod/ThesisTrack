# ThesisTrack

ThesisTrack es una aplicación web para gestionar proyectos de grado en la universidad Unipaz. Está desarrollada con Django y React, utilizando SQLite como base de datos. Este proyecto tiene como objetivo facilitar la organización, búsqueda y seguimiento de los proyectos de grado presentados por los estudiantes.

## Estructura del Proyecto

- **Backend**: Proyecto Django ubicado en la carpeta `Project`.
- **Frontend**: Aplicación React ubicada en la carpeta `thesistrakfront`.

```plaintext
~/D/Proyects (testing)
├── Project
│   ├── db.sqlite3
│   ├── documents/
│   ├── manage.py
│   ├── media/
│   ├── Procfile
│   ├── Project/
│   ├── requirements.txt
│   ├── rewards/
│   ├── runtime.txt
│   └── userz/
└── thesistrakfront
    ├── build/
    ├── node_modules/
    ├── package.json
    ├── package-lock.json
    ├── public/
    ├── README.md
    └── src/
```

## Instalación y Configuración

### Prerrequisitos

- Python 3.8+
- Node.js 14+
- npm 6+

### Backend (Django)

1. **Instalar dependencias**:

    ```bash
    cd Project
    pip install -r requirements.txt
    ```

2. **Aplicar migraciones**:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

3. **Ejecutar servidor de desarrollo**:

    ```bash
    python manage.py runserver
    ```

### Frontend (React)

1. **Instalar dependencias**:

    ```bash
    cd ../thesistrakfront
    npm install
    ```

2. **Ejecutar servidor de desarrollo**:

    ```bash
    npm start
    ```

## Características

- **Autenticación**: Integración con Google para el inicio de sesión.
- **Gestión de documentos**: Subida, visualización y descarga de documentos.
- **Filtros avanzados**: Búsqueda por carrera y texto combinado.
- **Estadísticas**: Visualización de estadísticas de los proyectos.

## Configuración Adicional

### Variables de Entorno

Para el correcto funcionamiento de la aplicación, asegúrate de configurar las siguientes variables de entorno:

- **Django**:

    ```plaintext
    DEBUG=True
    SECRET_KEY=your_secret_key
    DATABASE_URL=sqlite:///db.sqlite3
    ```

- **React**:

    ```plaintext
    REACT_APP_API_URL=http://localhost:8000
    ```

### Archivos de Configuración

- **Procfile**: Configuración para desplegar la aplicación en servicios como Heroku.

    ```plaintext
    web: gunicorn Project.wsgi --log-file -
    ```

- **runtime.txt**: Especifica la versión de Python.

    ```plaintext
    python-3.8.10
    ```

## Estructura del Código

### Backend (Django)

- **manage.py**: Script principal para interactuar con el proyecto Django.
- **db.sqlite3**: Base de datos SQLite.
- **Project/**: Configuración principal del proyecto Django.
- **userz/**: Aplicación Django para gestionar usuarios.
- **documents/**: Aplicación Django para gestionar documentos.
- **rewards/**: Aplicación Django para gestionar recompensas.

### Frontend (React)

- **src/**: Directorio principal del código fuente de React.
    - **components/**: Componentes reutilizables de React.
    - **App.js**: Componente principal de la aplicación.
    - **index.js**: Punto de entrada de la aplicación.
    - **media/**: Archivos multimedia.
    - **fonts/**: Tipografías utilizadas en la aplicación.
    - **setupTests.js**: Configuración de pruebas.

### Dependencias del Frontend

La aplicación React utiliza las siguientes dependencias:

- `@babel/plugin-proposal-private-property-in-object@7.21.11`
- `@testing-library/jest-dom@5.17.0`
- `@testing-library/react@13.4.0`
- `@testing-library/user-event@13.5.0`
- `axios@1.6.8`
- `echarts-for-react@3.0.2`
- `echarts@5.5.1`
- `framer-motion@11.2.12`
- `intersection-observer@0.12.2`
- `js-cookie@3.0.5`
- `lottie-react@2.4.0`
- `ngrok@5.0.0-beta.2`
- `pnpm@9.3.0`
- `react-dom@18.3.1`
- `react-icons@5.2.1`
- `react-loader-spinner@6.1.6`
- `react-router-dom@6.23.1`
- `react-scripts@5.0.1`
- `react-select@5.8.0`
- `react@18.3.1`
- `sweetalert2@11.12.1`
- `web-vitals@2.1.4`

## Contribuir

Si deseas contribuir a ThesisTrack, por favor sigue estos pasos:

1. **Fork** el repositorio.
2. **Crea** una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. **Commit** tus cambios (`git commit -m 'Agregar nueva característica'`).
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`).
5. **Abre** un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para cualquier duda o sugerencia, por favor contacta a Luis (godprogrammer) en su [correo electrónico](pipenet12@gmail.com).

  ---
                                  ++++*******==++++++++++******#*+++-+++                            
                                 -*##%%######+###%##%###%%%%#%%###**+*+%*                           
                                 :%%%%%+#%%%#**+=#%*%##%#%##%%%#%#%#*++##                           
                                  :--*%+##+==:#*=%*+++**+%##%**+-:-+*++#*                           
                                     *%+###   ##=#*     =###%*     +%+*#*                           
                                     +%*#*+   #+=#+     =%##%*     +*-+++                           
                                     +%=*++             =%##%*                                      
                                     +#+*#*             +%#*%*                                      
                                     =#==*#             +%+*%*                                      
                                     =%+###             +#-+**                                      
                                     =%*##*             +#+*%#                                      
                                     +%+##*             -###%#                                      
                          *##+%:     +%+##*     +%=%%*  =###%#                                      
                          *#+*#:     +%*##*     +#+%%*  =#**%*                                      
                          **+++%##%%%%%*###%%%%#%*=***%#%%#*%%%%*+                                  
                          *#=-=-++***#*+*****+****+**=++*++=++===-                                  
                          +***=%**#%%#%%%%########*##*####**#%%#**    
