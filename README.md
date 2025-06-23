# BASE DE CONOCIMIENTO LIS 🤓

<p align="center">
  <img src="https://github.com/user-attachments/assets/f97220b4-2d59-45a5-95e3-c133477797e4" alt="BCLIS Logo" width="350"/>
</p>

Bienvenido al repositorio del **Frontend de BC-LIS** 🎉. Este proyecto contiene la interfaz de usuario para la base de conocimiento del laboratorio integrado de sistemas (LIS), desarrollado con tecnologías modernas y un enfoque centrado en la usabilidad y eficiencia.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)

### 📖 Descripción

El sistema de información de laboratorio **BC-LIS** tiene como objetivo agilizar y optimizar la gestión de documentos relacionados a procesos que se llevan a cabo en el laboratorio. Este repositorio contiene el frontend del sistema, diseñado para ofrecer una experiencia de usuario amigable e intuitiva.

### 🚀 Tecnologías

- **React** - Librería para la construcción de interfaces de usuario.
- **Next.js** - Framework para aplicaciones React con soporte de renderizado en el servidor.
- **Tailwind CSS** - Framework de CSS para estilos rápidos y personalizados.
- **Zod** - Validación de datos y tipado seguro en formularios.
- **React Hook Form** - Manejo y validación de formularios en React.

### Dockerización 🐋

Importante tener instalado Docker en tu máquina. Para construir la imagen utiliza el comando:

```pw
docker build -t bc-lis-front .
```

> [!NOTE]
> Esto creará una imagen llamada bc-lis-front basada en la aplicación de NextJS

Una vez construida la imagen, puedes levantar el contenedor con:

```pw
docker run -p 3000:3000 bc-lis-front
```

Luego en tu navegador accede a localhost:3000
