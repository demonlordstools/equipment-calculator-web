package dl.equipmentCalculator.model

import dl.equipmentCalculator.model.Element.Companion.isValidElementCombination

data class Equipment(
        val ap: Int,
        val vp: Int,
        val hp: Int,
        val mp: Int,
        val weight: Int,
        val ranged: Boolean,
        val element: Element,
        val requiredWaffenschmiede: Int,
        val name: String) {

    companion object {
        val MAX_WEIGHT_BONUS = 57;

        fun validWeightAndElements(
                unitElement: Element,
                maxWeight: Int,
                vararg equipment: Equipment
        ): Boolean {
            val equipmentElements = equipment.map { it.element };
            val totalWeight = equipment.map { it.weight }.reduce { acc, curr -> acc + curr }
            return isValidElementCombination(unitElement, *equipmentElements.toTypedArray()) && totalWeight <= maxWeight;
        }

        val ALL_HELMETS: List<Equipment> = listOf(
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = 0, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "besser nix"),
                Equipment(ap = 0, vp = 5, hp = 5, mp = 0, weight = 2, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "Federkappe"),
                Equipment(ap = 0, vp = 5, hp = 0, mp = 4, weight = 2, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "Zauberhut"),
                Equipment(ap = 3, vp = 16, hp = 19, mp = 0, weight = 18, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "Eisenhelm"),
                Equipment(ap = 13, vp = 28, hp = 25, mp = 0, weight = 30, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Schädelplatte"),
                Equipment(ap = 15, vp = -8, hp = -10, mp = 0, weight = 10, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Spiegelhelm"),
                Equipment(ap = 15, vp = 55, hp = 45, mp = 0, weight = 52, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 3, name = "Totenschädelhelm"),
                Equipment(ap = 0, vp = 15, hp = 65, mp = 20, weight = 38, ranged = false, element = Element.AIR, requiredWaffenschmiede = 3, name = "Diadem"),
                Equipment(ap = 16, vp = 46, hp = 53, mp = 0, weight = 32, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 3, name = "Heiliger Helm des Drachentöters"),
                Equipment(ap = 30, vp = 30, hp = 50, mp = 0, weight = 45, ranged = false, element = Element.ICE, requiredWaffenschmiede = 3, name = "Kalte Maske"),
                Equipment(ap = 10, vp = 60, hp = 50, mp = 0, weight = 50, ranged = false, element = Element.NONE, requiredWaffenschmiede = 4, name = "Normannenhelm"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 29, weight = 13, ranged = false, element = Element.NONE, requiredWaffenschmiede = 4, name = "Diadem der Toten"),
                Equipment(ap = -135, vp = 30, hp = 150, mp = 0, weight = 95, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Helm des Friedens"),
                Equipment(ap = 10, vp = 45, hp = 95, mp = 0, weight = 60, ranged = false, element = Element.NONE, requiredWaffenschmiede = 6, name = "Drachenhelm"),
                Equipment(ap = 0, vp = 25, hp = 5, mp = 30, weight = 9, ranged = false, element = Element.NONE, requiredWaffenschmiede = 7, name = "Athenes Weisheit"),
                Equipment(ap = 95, vp = 50, hp = 80, mp = 90, weight = 140, ranged = false, element = Element.NONE, requiredWaffenschmiede = 8, name = "Helm der Requisition"),
                Equipment(ap = 110, vp = 90, hp = 120, mp = 0, weight = 90, ranged = false, element = Element.NONE, requiredWaffenschmiede = 8, name = "Knochenhelm des Ketzers"),
                Equipment(ap = 0, vp = 0, hp = 200, mp = 0, weight = 20, ranged = false, element = Element.NONE, requiredWaffenschmiede = 9, name = "Kessel des Küchenmeisters"),
                Equipment(ap = 0, vp = 300, hp = 400, mp = 0, weight = 150, ranged = false, element = Element.NONE, requiredWaffenschmiede = 10, name = "Helm der Ehrfurcht"),
                Equipment(ap = 220, vp = 90, hp = 175, mp = 30, weight = 120, ranged = false, element = Element.NONE, requiredWaffenschmiede = 10, name = "Verzierter Stahlhelm"),
        )

        val ALL_ARMOUR: List<Equipment> = listOf(
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = 0, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "besser nix"),
                Equipment(ap = 0, vp = 3, hp = 5, mp = 0, weight = 2, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "Flickenpanzer"),
                Equipment(ap = 0, vp = 5, hp = 15, mp = 0, weight = 5, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "Lederrüstung"),
                Equipment(ap = 5, vp = 25, hp = 25, mp = 0, weight = 12, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Dornenweste"),
                Equipment(ap = 10, vp = 10, hp = 10, mp = 0, weight = 8, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Lederharnisch"),
                Equipment(ap = 10, vp = 50, hp = 30, mp = 0, weight = 35, ranged = false, element = Element.NONE, requiredWaffenschmiede = 3, name = "Kettenhemd"),
                Equipment(ap = 10, vp = 32, hp = 31, mp = 0, weight = 20, ranged = false, element = Element.NONE, requiredWaffenschmiede = 3, name = "Kriegsausrüstung"),
                Equipment(ap = 0, vp = 46, hp = 39, mp = 25, weight = 34, ranged = false, element = Element.NONE, requiredWaffenschmiede = 3, name = "Himmlischer Plattenpanzer"),
                Equipment(ap = -5, vp = 50, hp = 30, mp = 0, weight = 25, ranged = false, element = Element.ICE, requiredWaffenschmiede = 4, name = "Morgenreif-Harnisch"),
                Equipment(ap = 0, vp = 50, hp = 50, mp = 0, weight = 20, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 4, name = "Erdenmantel"),
                Equipment(ap = 10, vp = 98, hp = 98, mp = 0, weight = 45, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 4, name = "Heilige Rüstung des Drachentöters"),
                Equipment(ap = 0, vp = 40, hp = 60, mp = 0, weight = 35, ranged = false, element = Element.AIR, requiredWaffenschmiede = 4, name = "Windmacht"),
                Equipment(ap = 0, vp = 50, hp = 90, mp = 0, weight = 65, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Titanpanzer"),
                Equipment(ap = 0, vp = 5, hp = 0, mp = 30, weight = 15, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Einhornfell"),
                Equipment(ap = 50, vp = 20, hp = 0, mp = 10, weight = 20, ranged = false, element = Element.NONE, requiredWaffenschmiede = 6, name = "Neptunsrobe"),
                Equipment(ap = -190, vp = 90, hp = 230, mp = 0, weight = 115, ranged = false, element = Element.NONE, requiredWaffenschmiede = 6, name = "Rüstung des Friedens"),
                Equipment(ap = 10, vp = 300, hp = 225, mp = 0, weight = 100, ranged = false, element = Element.NONE, requiredWaffenschmiede = 7, name = "Plattenpanzer"),
                Equipment(ap = 0, vp = 70, hp = 100, mp = 0, weight = 95, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 7, name = "Obsidianpanzer"),
                Equipment(ap = 75, vp = 315, hp = 320, mp = 0, weight = 120, ranged = false, element = Element.NONE, requiredWaffenschmiede = 8, name = "Gigas Rüstung"),
                Equipment(ap = 50, vp = 150, hp = 150, mp = 5, weight = 100, ranged = false, element = Element.AIR, requiredWaffenschmiede = 8, name = "Gewitterrüstung"),
                Equipment(ap = 0, vp = 200, hp = -25, mp = 0, weight = 15, ranged = false, element = Element.NONE, requiredWaffenschmiede = 8, name = "Tückische Rüstung"),
                Equipment(ap = 0, vp = 1000, hp = 0, mp = 0, weight = 200, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 9, name = "Trutzrüstung"),
                Equipment(ap = 100, vp = 200, hp = 140, mp = 0, weight = 75, ranged = false, element = Element.NONE, requiredWaffenschmiede = 9, name = "Geschenk des Himmels"),
                Equipment(ap = 380, vp = 600, hp = 550, mp = 0, weight = 470, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 10, name = "Silberner Prunkharnisch"),
                Equipment(ap = 200, vp = 370, hp = 410, mp = 0, weight = 320, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 10, name = "Rostfreie Rüstung eines toten Helden"),
                Equipment(ap = -70, vp = 800, hp = 600, mp = 0, weight = 290, ranged = false, element = Element.NONE, requiredWaffenschmiede = 10, name = "Furcht"),
        )

        val ALL_SHIELDS: List<Equipment> = listOf(
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = 0, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "besser nix"),
                Equipment(ap = 0, vp = 15, hp = 5, mp = 0, weight = 5, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "Holzschild"),
                Equipment(ap = 0, vp = 18, hp = 23, mp = 0, weight = 14, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "Rundschild"),
                Equipment(ap = 10, vp = 35, hp = 20, mp = 0, weight = 20, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Dornenschild"),
                Equipment(ap = 0, vp = 25, hp = 40, mp = 10, weight = 20, ranged = false, element = Element.ICE, requiredWaffenschmiede = 3, name = "Wappenschild"),
                Equipment(ap = 5, vp = 34, hp = 23, mp = 45, weight = 32, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 3, name = "Brennender Schild"),
                Equipment(ap = 15, vp = 20, hp = 20, mp = 0, weight = 24, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 3, name = "Stachelschild"),
                Equipment(ap = 0, vp = 5, hp = 5, mp = 20, weight = 10, ranged = false, element = Element.AIR, requiredWaffenschmiede = 3, name = "Federschild"),
                Equipment(ap = 10, vp = 55, hp = 55, mp = 0, weight = 33, ranged = false, element = Element.NONE, requiredWaffenschmiede = 4, name = "Turmschild"),
                Equipment(ap = -180, vp = 255, hp = 120, mp = 0, weight = 120, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Schild des Friedens"),
                Equipment(ap = 50, vp = 150, hp = 0, mp = 0, weight = 15, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Orkenschild"),
                Equipment(ap = 5, vp = 60, hp = 190, mp = 0, weight = 85, ranged = false, element = Element.NONE, requiredWaffenschmiede = 6, name = "Drachenschild"),
                Equipment(ap = 15, vp = 65, hp = 75, mp = 0, weight = 48, ranged = false, element = Element.AIR, requiredWaffenschmiede = 7, name = "Sturmblocker"),
                Equipment(ap = 20, vp = 98, hp = 98, mp = 0, weight = 55, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 7, name = "Heiliger Schild des Drachentöters"),
                Equipment(ap = 15, vp = 70, hp = 110, mp = 0, weight = 75, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 7, name = "Knochenschild"),
                Equipment(ap = 30, vp = 70, hp = 110, mp = 0, weight = 20, ranged = false, element = Element.ICE, requiredWaffenschmiede = 8, name = "Panzer der Schildkrötenprinzessin"),
                Equipment(ap = -135, vp = 250, hp = 230, mp = 0, weight = 140, ranged = false, element = Element.ICE, requiredWaffenschmiede = 9, name = "Frostwurmschuppen"),
                Equipment(ap = 60, vp = 200, hp = 105, mp = 30, weight = 40, ranged = false, element = Element.NONE, requiredWaffenschmiede = 10, name = "Gewebter Harnisch des Ketzers"),
                Equipment(ap = 50, vp = 160, hp = 110, mp = 0, weight = 30, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 10, name = "Brustkorb eines Erzfeindes"),
                Equipment(ap = 50, vp = 160, hp = 110, mp = 0, weight = 30, ranged = false, element = Element.ICE, requiredWaffenschmiede = 10, name = "Brustkorb eines kalten Erzfeindes"),
        );

        val ALL_ACCESSORIES: List<Equipment> = listOf(
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = 0, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "besser nix"),
                Equipment(ap = 0, vp = 3, hp = 2, mp = 0, weight = 0, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "Ranzige Stiefel"),
                Equipment(ap = 0, vp = 5, hp = 5, mp = 0, weight = 1, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "Bronzering"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 8, weight = 1, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "geflügelte Sandalen"),
                Equipment(ap = 5, vp = 15, hp = 10, mp = 0, weight = 5, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Falkenring"),
                Equipment(ap = 0, vp = 0, hp = 15, mp = 10, weight = 15, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Voodoopuppe"),
                Equipment(ap = 0, vp = 12, hp = 12, mp = 5, weight = 10, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Tarot Karten"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 15, weight = 20, ranged = false, element = Element.NONE, requiredWaffenschmiede = 3, name = "Feenamulett"),
                Equipment(ap = 0, vp = 25, hp = 40, mp = 0, weight = 14, ranged = false, element = Element.NONE, requiredWaffenschmiede = 3, name = "Schutzring"),
                Equipment(ap = 0, vp = 25, hp = 50, mp = 0, weight = 22, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 3, name = "Höllenauge"),
                Equipment(ap = 45, vp = -30, hp = -35, mp = 0, weight = 28, ranged = false, element = Element.NONE, requiredWaffenschmiede = 3, name = "Glorienring"),
                Equipment(ap = 0, vp = 30, hp = 90, mp = 0, weight = 36, ranged = false, element = Element.NONE, requiredWaffenschmiede = 4, name = "Elfenbeinamulett"),
                Equipment(ap = 45, vp = 35, hp = 15, mp = 0, weight = 28, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 4, name = "Knochenring"),
                Equipment(ap = -70, vp = 50, hp = 115, mp = 0, weight = 30, ranged = false, element = Element.NONE, requiredWaffenschmiede = 4, name = "Amulett des Friedens"),
                Equipment(ap = 0, vp = 110, hp = 0, mp = 0, weight = 42, ranged = false, element = Element.NONE, requiredWaffenschmiede = 4, name = "Harnischamulett"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = -20, ranged = false, element = Element.NONE, requiredWaffenschmiede = 4, name = "Amulett der Kraft"),
                Equipment(ap = -12, vp = 12, hp = 115, mp = 0, weight = 58, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Lindwurmamulett"),
                Equipment(ap = 0, vp = 80, hp = 0, mp = 0, weight = 15, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 5, name = "Feuerring"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 30, weight = 50, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Ring des Geistes"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = -30, ranged = false, element = Element.NONE, requiredWaffenschmiede = 6, name = "Ogerkraft-Amulett"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 45, weight = 25, ranged = false, element = Element.NONE, requiredWaffenschmiede = 6, name = "Sonnenring"),
                Equipment(ap = -800, vp = -400, hp = 0, mp = 0, weight = 450, ranged = false, element = Element.NONE, requiredWaffenschmiede = 6, name = "Riesiger ausgehölter Baumstumpf"),
                Equipment(ap = 173, vp = 97, hp = 224, mp = 5, weight = 100, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 7, name = "Phönixfederschmuck"),
                Equipment(ap = 50, vp = 60, hp = 45, mp = 20, weight = 50, ranged = false, element = Element.NONE, requiredWaffenschmiede = 8, name = "Aldeas Halskette"),
                Equipment(ap = 110, vp = 150, hp = 225, mp = 0, weight = 45, ranged = false, element = Element.NONE, requiredWaffenschmiede = 9, name = "Heiliger Wikingerring"),
                Equipment(ap = 0, vp = 100, hp = 50, mp = 0, weight = -50, ranged = false, element = Element.AIR, requiredWaffenschmiede = 9, name = "Eiserne Krafthandschuhe"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 100, weight = 5, ranged = false, element = Element.NONE, requiredWaffenschmiede = 9, name = "Auge der Seherin"),
                Equipment(ap = 140, vp = 220, hp = 310, mp = 0, weight = 60, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 10, name = "Ring des Spatzenkönigs"),
                Equipment(ap = 140, vp = 220, hp = 310, mp = 0, weight = 60, ranged = false, element = Element.ICE, requiredWaffenschmiede = 10, name = "Ring der Mäusekönigin"),
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = -57, ranged = false, element = Element.NONE, requiredWaffenschmiede = 10, name = "Ring der 1000 Möglichkeiten"),
        )

        val ALL_WEAPONS: List<Equipment> = listOf(
                Equipment(ap = 0, vp = 0, hp = 0, mp = 0, weight = 0, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "besser nix"),
                Equipment(ap = 3, vp = 0, hp = 0, mp = 0, weight = 2, ranged = false, element = Element.NONE, requiredWaffenschmiede = 0, name = "Angespitzer Holzstock"),
                Equipment(ap = 35, vp = 10, hp = 10, mp = 0, weight = 9, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "Kurzschwert"),
                Equipment(ap = 10, vp = 0, hp = 0, mp = 0, weight = 3, ranged = true, element = Element.NONE, requiredWaffenschmiede = 1, name = "Wurfpfeile"),
                Equipment(ap = 15, vp = 0, hp = 0, mp = 10, weight = 15, ranged = false, element = Element.NONE, requiredWaffenschmiede = 1, name = "Langdolch der Geister"),
                Equipment(ap = 25, vp = 15, hp = 0, mp = 0, weight = 10, ranged = true, element = Element.NONE, requiredWaffenschmiede = 1, name = "Stabschleuder"),
                Equipment(ap = 20, vp = 5, hp = 5, mp = 0, weight = 12, ranged = false, element = Element.AIR, requiredWaffenschmiede = 2, name = "Wirbelwindfaust"),
                Equipment(ap = 10, vp = 5, hp = 3, mp = 0, weight = 10, ranged = false, element = Element.ICE, requiredWaffenschmiede = 2, name = "Eisdolch"),
                Equipment(ap = -40, vp = -20, hp = 0, mp = 15, weight = 7, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 2, name = "Novizenstab"),
                Equipment(ap = 30, vp = 30, hp = 0, mp = 0, weight = 35, ranged = false, element = Element.AIR, requiredWaffenschmiede = 2, name = "Tanzender Krummsäbel"),
                Equipment(ap = 45, vp = 38, hp = 23, mp = 0, weight = 39, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 2, name = "Feuerhellebarde"),
                Equipment(ap = 30, vp = 0, hp = 0, mp = 0, weight = 15, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 2, name = "Erdvernichter"),
                Equipment(ap = 44, vp = 20, hp = 0, mp = 0, weight = 20, ranged = false, element = Element.NONE, requiredWaffenschmiede = 2, name = "Bo"),
                Equipment(ap = 45, vp = 0, hp = 0, mp = 0, weight = 25, ranged = true, element = Element.NONE, requiredWaffenschmiede = 3, name = "Leichte Armbrust"),
                Equipment(ap = -10, vp = 0, hp = 0, mp = 5, weight = 8, ranged = true, element = Element.ICE, requiredWaffenschmiede = 3, name = "Harfe der Banshee"),
                Equipment(ap = 45, vp = 0, hp = 0, mp = 0, weight = 20, ranged = true, element = Element.AIR, requiredWaffenschmiede = 3, name = "Bogen des Windes"),
                Equipment(ap = 37, vp = 9, hp = 35, mp = 0, weight = 33, ranged = false, element = Element.NONE, requiredWaffenschmiede = 3, name = "Krummsäbel"),
                Equipment(ap = 25, vp = 0, hp = 0, mp = 0, weight = 8, ranged = true, element = Element.EARTH, requiredWaffenschmiede = 3, name = "Dreckschleuder"),
                Equipment(ap = 80, vp = 0, hp = 0, mp = 0, weight = 25, ranged = true, element = Element.FIRE, requiredWaffenschmiede = 3, name = "Feuerbogen"),
                Equipment(ap = 40, vp = 20, hp = 20, mp = 0, weight = 50, ranged = false, element = Element.ICE, requiredWaffenschmiede = 4, name = "Froststab"),
                Equipment(ap = 75, vp = 0, hp = 0, mp = 0, weight = 30, ranged = true, element = Element.NONE, requiredWaffenschmiede = 4, name = "Schwere Armbrust"),
                Equipment(ap = 100, vp = 50, hp = 30, mp = -100, weight = 120, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 4, name = "Zwergischer Schmiedehammer"),
                Equipment(ap = 145, vp = -55, hp = 0, mp = 0, weight = 75, ranged = true, element = Element.NONE, requiredWaffenschmiede = 5, name = "Elfischer Jagdbogen"),
                Equipment(ap = -200, vp = -150, hp = 0, mp = 40, weight = 30, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 5, name = "Flammenstab"),
                Equipment(ap = 50, vp = 0, hp = 0, mp = 0, weight = 20, ranged = true, element = Element.ICE, requiredWaffenschmiede = 5, name = "Eisbogen"),
                Equipment(ap = 250, vp = -45, hp = -5, mp = 0, weight = 100, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Heliosklinge"),
                Equipment(ap = 128, vp = -16, hp = 0, mp = 0, weight = 67, ranged = true, element = Element.FIRE, requiredWaffenschmiede = 5, name = "Schwere Balliste des Drachentöters"),
                Equipment(ap = 140, vp = 60, hp = 45, mp = 0, weight = 132, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 5, name = "Feuerkrallen"),
                Equipment(ap = 170, vp = -170, hp = 120, mp = 0, weight = 112, ranged = false, element = Element.NONE, requiredWaffenschmiede = 5, name = "Große Spaltaxt"),
                Equipment(ap = 175, vp = -40, hp = 0, mp = 0, weight = 78, ranged = true, element = Element.FIRE, requiredWaffenschmiede = 6, name = "Dämonenarmbrust"),
                Equipment(ap = 85, vp = -5, hp = -5, mp = 0, weight = 33, ranged = true, element = Element.AIR, requiredWaffenschmiede = 6, name = "Sturmbogen"),
                Equipment(ap = 155, vp = -30, hp = -10, mp = 0, weight = 60, ranged = true, element = Element.EARTH, requiredWaffenschmiede = 6, name = "Knochenarmbrust"),
                Equipment(ap = 110, vp = -25, hp = 0, mp = 0, weight = 40, ranged = true, element = Element.ICE, requiredWaffenschmiede = 6, name = "Splitterbogen"),
                Equipment(ap = 150, vp = -5, hp = 0, mp = 0, weight = 50, ranged = false, element = Element.AIR, requiredWaffenschmiede = 7, name = "Federschwert"),
                Equipment(ap = 95, vp = -15, hp = 5, mp = 0, weight = 60, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 7, name = "Zwergenaxt"),
                Equipment(ap = 100, vp = 30, hp = 5, mp = 0, weight = 40, ranged = false, element = Element.ICE, requiredWaffenschmiede = 7, name = "Eissäbel"),
                Equipment(ap = 200, vp = 50, hp = 0, mp = 0, weight = 50, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 7, name = "Blutbeflecktes Schwert des Zorns"),
                Equipment(ap = 400, vp = 120, hp = 120, mp = 0, weight = 155, ranged = false, element = Element.NONE, requiredWaffenschmiede = 8, name = "Götterzucht"),
                Equipment(ap = 400, vp = 0, hp = 0, mp = 50, weight = 85, ranged = false, element = Element.ICE, requiredWaffenschmiede = 9, name = "Hammer des Gletscherkönigs"),
                Equipment(ap = 100, vp = 0, hp = 0, mp = 200, weight = 35, ranged = false, element = Element.NONE, requiredWaffenschmiede = 9, name = "Stab der Erleuchtung"),
                Equipment(ap = 130, vp = 0, hp = 0, mp = 0, weight = 35, ranged = true, element = Element.NONE, requiredWaffenschmiede = 9, name = "Uralter Sauwerfer"),
                Equipment(ap = 450, vp = 25, hp = 25, mp = 0, weight = 225, ranged = false, element = Element.EARTH, requiredWaffenschmiede = 10, name = "Titanengladius"),
                Equipment(ap = 410, vp = -10, hp = -10, mp = 0, weight = 160, ranged = false, element = Element.FIRE, requiredWaffenschmiede = 10, name = "Höllenschwert"),
                Equipment(ap = 510, vp = 60, hp = 15, mp = 0, weight = 200, ranged = false, element = Element.ICE, requiredWaffenschmiede = 10, name = "Dimensionenklingen"),
                Equipment(ap = 380, vp = 0, hp = 0, mp = 0, weight = 180, ranged = true, element = Element.NONE, requiredWaffenschmiede = 10, name = "Karmesinroter Bogen"),
                Equipment(ap = 600, vp = 200, hp = 200, mp = 20, weight = 300, ranged = false, element = Element.AIR, requiredWaffenschmiede = 10, name = "Mjölnir"),
                Equipment(ap = 400, vp = 200, hp = 200, mp = 0, weight = 103, ranged = false, element = Element.NONE, requiredWaffenschmiede = 10, name = "Verzauberte Knochenaxt"),
        )
    }
}
