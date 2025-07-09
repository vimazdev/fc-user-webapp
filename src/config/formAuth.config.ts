export const loginFields = [
    {
        label: 'Correo electrónico',
        type: 'email',
        name: 'email',
        placeholder: 'juan@example.com',
    },
    {
        label: 'Contraseña',
        type: 'password',
        name: 'password',
        placeholder: '••••••••••••••••',
    },
];

export const registerFields = [
    {
        label: 'Nombre completo',
        type: 'text',
        name: 'name',
        placeholder: 'Juan Rodríguez',
    },
    ...loginFields, // email + password también van en el registro
    {
        label: 'Confirmar contraseña',
        type: 'password',
        name: 'confirmPass',
        placeholder: '••••••••••••••••',
    },
];
