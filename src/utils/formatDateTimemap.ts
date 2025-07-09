export function formatFechaExtendida(timestamp: string): string {
    const fecha = new Date(timestamp);

    const dias = [
        "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ];
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const diaSemana = dias[fecha.getUTCDay()];
    const dia = String(fecha.getUTCDate()).padStart(2, "0");
    const mes = meses[fecha.getUTCMonth()];
    const año = fecha.getUTCFullYear();

    return `${diaSemana} ${dia} de ${mes} ${año}`;
}
