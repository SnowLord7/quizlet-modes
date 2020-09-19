function Debug() {
    
}

Debug.prototype.run = function () {
    let locale = this.get_locale(),
        settings = this.get_settings(),
        hashes = this.get_hashes(),
        version = this.get_version();

    return `Date: ${Date.now()}
Locale: ${locale.join(',')}
Settings: ${settings}
Hashes: ${JSON.stringify(hashes)}
Version: ${version}
Location: ${window.location.pathname}`;
}

Debug.prototype.get_version = () => {
    return _extensionVersion || '-1';
}

Debug.prototype.get_locale = () => {
    
    if (Quizlet) {

        // Default derived locale
        let locale = [Quizlet.countryCode, Quizlet.derivedLocale];

        // If the user is logged in
        if (Quizlet.user) {
            locale.push(Quizlet.user.userLocalePreference);
            locale.push(Quizlet.user.webLocale);
        }

        return locale;
    }

    return [];
}

Debug.prototype.get_settings = () => {
    let response = settings.get();
    return JSON.stringify(response);
}

Debug.prototype.get_hashes = () => {
    let hashes = {}
    if (typeof Answers == 'object') hashes.Answers = Object.keys(Answers).join().hashCode();
    if (typeof Flashcards == 'function') hashes.Flashcards = Flashcards.toString().hashCode();
    if (typeof Gravity == 'function') hashes.Gravity = Gravity.toString().hashCode();
    if (typeof Learn == 'function') hashes.Learn = Learn.toString().hashCode();
    if (typeof Live == 'function') hashes.Live = Live.toString().hashCode();
    if (typeof Exploit == 'function') hashes.Exploit = Exploit.toString().hashCode();
    if (typeof Match == 'function') hashes.Match = Match.toString().hashCode();
    if (typeof Micromatch == 'function') hashes.Micromatch = Micromatch.toString().hashCode();
    if (typeof Spell == 'function') hashes.Spell = Spell.toString().hashCode();
    if (typeof Test == 'function') hashes.Test = Test.toString().hashCode();
    if (typeof Write == 'function') hashes.Write = Write.toString().hashCode();
    if (typeof drewsnow == 'object') hashes.Module = drewsnow.init.toString().hashCode();
    if (typeof settings == 'object') hashes.Settings = JSON.stringify(settings).hashCode();
    return hashes;
}