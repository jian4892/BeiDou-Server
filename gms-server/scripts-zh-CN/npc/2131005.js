var status = -1;
var exchangeItem = 4000436;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("我希望我有东西可以装这些水...#b\r\n#L0#嘿，拿这些蜗牛壳。你可以用这些来装水。#l");
    } else if (status == 1) {
        if (!cm.haveItem(exchangeItem, 100)) {
            cm.sendNext("你没有足够的... 我至少需要100个。");
            cm.dispose();
        } else {
            cm.sendGetNumber("Hey, that's a good idea! I can give you #i4310000#Perfect Pitch for each 100 #i" + exchangeItem + "##t" + exchangeItem + "# you give me. How many do you want? (Current Items: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
        }
    } else if (status == 2) {
        if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
            if (!cm.canHold(4310000, selection)) {
                cm.sendOk("请在杂项标签页中腾出一些空间。");
            } else {
                cm.gainItem(4310000, selection);
                cm.gainItem(exchangeItem, -(selection * 100));
                cm.sendOk("谢谢！");
            }
        }
        cm.dispose();
    }
}