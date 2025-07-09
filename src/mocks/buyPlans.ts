export type Benefit = {
    list: string[];
};

export interface Plan {
    label: string;
    price: number;
    save?: number;
    popular?: boolean;
    benefits?: Benefit;
}

export const buyPlans: Plan[] = [
    {
        label: 'Plan Centurión',
        price: 69,
        benefits: {
            list: ['Acceso a cursos (forex, binarias, futuros, índices)', 'Señales en vivo', 'Copy Trading automatizado', 'Mentorías en vivo', 'Programa de afiliados (50% comisión)', 'Certificado de trader rentable']
        }
    },
    {
        label: 'Plan Gladiador',
        price: 120,
        save: 18,
        popular: true,
        benefits: {
            list: ['Todo de Centurión', 'Mentorías personalizadas', 'Acceso prioritario a nuevas herramientas']
        }
    },
    {
        label: 'Plan Titanio',
        price: 360,
        save: 54,
        benefits: {
            list: ['Todo en Gladiador', 'Soporte técnico avanzado', 'Más recursos promocionales en afiliados']
        }
    },
    {
        label: 'Plan Leyenda',
        price: 740,
        save: 123.96,
        benefits: {
            list: ['Todo en Titanio', 'Beneficios exclusivos y herramientas premium', 'Acceso VIP a eventos y mentorías avanzadas']
        }
    }
];
