import { cambiarAMayuscula } from "./lista.js";

export function mostrarPokemon(pokemon){ 
    if(document.querySelector('#ayuda')){
        document.querySelector('#ayuda').remove();
    }
    const {name: nombre, sprites: {front_default: foto}, 
    types: tipos, abilities: habilidades, moves: movimientos} = pokemon;
    const imagen = document.querySelector('#pokemon-imagen');
    imagen.setAttribute('src', foto);
    imagen.setAttribute('alt', `Imagen del pokemon ${cambiarAMayuscula(nombre)}`);
    document.querySelector('#pokemon-nombre').textContent = `${cambiarAMayuscula(nombre)}`;
    document.querySelector('#pokemon-id').textContent =`#${pokemon.id} `;
    mostrarTipos(tipos.map((items) => items.type.name));
    mostrarHabilidades(habilidades.map((items) => items.ability.name));
    mostrarMovimientos(movimientos.map((items) => ({
        movimiento: items.move.name,
        versiones: items.version_group_details.map((itemDetalles) => itemDetalles.version_group.name)
    })));
}

export function mostrarTipos(tipos){
    const $tipos = document.querySelector('#tipos-container');
    $tipos.innerHTML = '';

    tipos.forEach((tipo) => {
        const spanTipo = document.createElement('span');
        spanTipo.className = `badge ${tipo}`;
        spanTipo.textContent = tipo;
        $tipos.appendChild(spanTipo);
    })
}

export function mostrarHabilidades(habilidades){
    const $habilidades = document.querySelector('#habilidades-container');
    $habilidades.innerHTML = '';

    habilidades.forEach((habilidad) => {
        const spanHabilidad = document.createElement('span');
        spanHabilidad.className = 'badge badge-info';
        spanHabilidad.style.color = 'violet';
        spanHabilidad.textContent = `${habilidad} `;
        $habilidades.appendChild(spanHabilidad);
    })
}

export function mostrarMovimientos(movimientos){
    const $movimientos = document.querySelector('#movimientos-versiones');
    $movimientos.innerHTML = '';

    movimientos.forEach((movimiento) => {
        const { movimiento: nombreMovimiento, versiones } = movimiento;
        const $movimientoFila = document.createElement('tr');
        const $movimiento = document.createElement('th');
        $movimiento.setAttribute('scope', 'row');
        $movimiento.textContent = nombreMovimiento;
        $movimientoFila.appendChild($movimiento);

        const $versiones = document.createElement('td');

        versiones.forEach((version) => {
            const $version = document.createElement('span');
            $version.className = 'badge';
            $version.style.color = 'violet';
            $version.textContent = version;
            $versiones.appendChild($version);
        });

        $movimientoFila.appendChild($versiones);
        $movimientos.appendChild($movimientoFila);
    });
}
