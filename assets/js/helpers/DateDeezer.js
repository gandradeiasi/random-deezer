class DateDeezer {

    static parseDate(date_deezer) {
        let date = new Date(date_deezer.substr(0, 8) + (parseInt(date_deezer.substr(8)) + 1).toString().padStart(2, 0));

        if (date == "Invalid Date") {
            date = new Date(date_deezer);

            if (date == "Invalid Date") {
                return false;
            }
        }

        return date;
    }
}