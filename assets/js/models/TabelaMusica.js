class TabelaMusica {
    constructor() {
        this.musicas = [];
        this.order_asc = '';
        this.order_by = '';
    }

    adiciona_musica(musica) {
        if (!musica.release) return;
        this.musicas.push(musica);
    }

    order(mantem_order_by, order_by = this.order_by) {
        if (order_by) {
            this.order_by = order_by;

            if (mantem_order_by) this.order_asc = !this.order_asc;

            this.musicas.sort((a, b) => {
                if (this.order_asc) return a[order_by] < b[order_by] ? 1 : -1;
                else return a[order_by] < b[order_by] ? -1 : 1;
            });

            this.order_asc = !this.order_asc;
        }
    }
}