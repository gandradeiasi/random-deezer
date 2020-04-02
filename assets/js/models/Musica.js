class Musica {
    constructor(json) {
        this.miniature = json.album.cover_big;
        this.album = json.album.title;
        this.link = json.link;
        this.rank = json.rank;
        this.title = json.title;
        this.id = json.id;
        this.artist = json.artist.name;
        this.release = DateDeezer.parseDate(json.release_date);
        this.duration = json.duration;
        this.explicit = json.explicit_lyrics;
    }
}