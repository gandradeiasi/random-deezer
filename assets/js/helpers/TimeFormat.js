class TimeFormat {

    static secondsToMinutes(seconds) {
        return parseInt(seconds / 60) + ":" + (seconds % 60).toString().padStart(2, '0');
    }
}