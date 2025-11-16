# real-state-system

# Propuesta 

**Optimización de una base de datos**

- Se plantea la creación de una base de datos que concentre toda la información relacionada con propiedades, usuarios e interacciones. 
- Esto permitirá almacenar datos estructurados como ubicación, precio, características del inmueble, así como el historial de búsquedas de cada usuario. 
- La base de datos será diseñada con un modelo relacional optimizado, que garantice consultas rápidas y seguras.

**Cómo se implementará:**

- Se utilizará un gestor de bases de datos como **PostgreSQL**.
- Se definirán tablas específicas para propiedades, usuarios, búsquedas e interacciones.
- Se aplicarán reglas de integridad y validación para evitar duplicados y mejorar la calidad de la información.
- Se incluirán funciones de búsqueda geoespacial para localizar propiedades en un mapa de forma precisa.

**UI/UX**

- Se desarrollará una interfaz principal para los usuario así el cliente podrá acceder fácilmente a las propiedades disponibles mediante filtros avanzados y visualizaciones claras del lado del cliente.

**Estructura**

- El frontend se desarrollará con **React**, garantizando un diseño adaptable a dispositivos móviles.
- El backend se implementará con **Node.js** o **Django**, conectando la aplicación con la base de datos.
- Se integrará un **mapa interactivo** para realizar búsquedas por zona.
- Se habilitará la creación de perfiles de usuario que permitan guardar búsquedas, registrar favoritos y recibir notificaciones personalizadas.

# Objetivos

1. Facilitar la búsqueda personalizada:
    - Intereses, zonas, estructura, precios y accesibilidad.

2. Optimizar procesos
    - Localización de inmuebles.

3. Refactorizar UX/UI
    - Optimización e interacción entre el cliente - servidor.
    - Interfaz de usuario amigable.

4. Mejorar la complejidad
    - Compra/venta de casas 
    - Modelo de negocio del lado del vendedor; para insertar información relevante a sus inmobiliarias para Licenciatiarios.

5. Transparencia y Protección a Clientes
    - Semaforo inmobiliario para proteger a los clientes con la compra de inmobiliarias asegurando:
        a. Fraccionamientos sin construcciones de obra negro
        b. Terrenos con licencias
        c. Plazas sin problemas de contratos a servicio público individual.
        d. Empresas bien establecidas.

**Dependences**
- Express
- pg
- sequelize
- bcrypt
- jsonwebtoken
- cors
- morgan
- axios
- tailwindcss
- nodemon
- eslint
- prettier
- vite