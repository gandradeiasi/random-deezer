class Musica {
    constructor(json) {
        this.miniature = json.album.cover_small;
        this.link = json.link;
        this.rank = json.rank;
        this.title = json.title;
        this.id = json.id;
        this.artist = json.artist.name;
        this.release = DateDeezer.parseDate(json.release_date);
    }
}