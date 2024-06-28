let HU = require('../../app/Models/HU');

// Bầu Cua
let BauCua = require('../Models/BauCua/BauCua_temp');
BauCua.findOne({}, {}, function(err, data) {
    if (!data) {
        BauCua.create({});
    }
});


// thiết lập Hũ Các Game SLot


HU.findOne({ game: "minipoker", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "minipoker",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "minipoker", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "minipoker",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "minipoker", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "minipoker",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "minipoker", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "minipoker",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "minipoker", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "minipoker",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "minipoker", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "minipoker",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// thiết lập Hũ BigBabol
// red
HU.findOne({ game: "bigbabol", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "bigbabol",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "bigbabol", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "bigbabol",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "bigbabol", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "bigbabol",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "bigbabol", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "bigbabol",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "bigbabol", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "bigbabol",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "bigbabol", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "bigbabol",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// thiết lập Hũ Vương Quốc Red
// red
HU.findOne({ game: "vuongquocred", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "vuongquocred",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "vuongquocred", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "vuongquocred",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "vuongquocred", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "vuongquocred",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "vuongquocred", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "vuongquocred",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "vuongquocred", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "vuongquocred",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "vuongquocred", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "vuongquocred",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// thiết lập Hũ Mini 3Cây
// red
HU.findOne({ game: "mini3cay", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "mini3cay",
                type: 100,
                red: true,
                bet: 2500 * 100,
                min: 2500 * 100,
            });
        }
    }
);

HU.findOne({ game: "mini3cay", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "mini3cay",
                type: 1000,
                red: true,
                bet: 2500 * 1000,
                min: 2500 * 1000,
            });
        }
    }
);

HU.findOne({ game: "mini3cay", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "mini3cay",
                type: 10000,
                red: true,
                bet: 2500 * 10000,
                min: 2500 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "mini3cay", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "mini3cay",
                type: 100,
                red: false,
                bet: 2500 * 100,
                min: 2500 * 100,
            });
        }
    }
);

HU.findOne({ game: "mini3cay", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "mini3cay",
                type: 1000,
                red: false,
                bet: 2500 * 1000,
                min: 2500 * 1000,
            });
        }
    }
);

HU.findOne({ game: "mini3cay", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "mini3cay",
                type: 10000,
                red: false,
                bet: 2500 * 10000,
                min: 2500 * 10000,
            });
        }
    }
);

// thiết lập Hũ Cao Thấp
// red
HU.findOne({ game: "caothap", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 1000,
                red: true,
                bet: 7 * 1000,
                min: 7 * 1000,
            });
        }
    }
);

HU.findOne({ game: "caothap", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 10000,
                red: true,
                bet: 7 * 10000,
                min: 7 * 10000,
            });
        }
    }
);

HU.findOne({ game: "caothap", type: 50000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 50000,
                red: true,
                bet: 7 * 50000,
                min: 7 * 50000,
            });
        }
    }
);

HU.findOne({ game: "caothap", type: 100000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 100000,
                red: true,
                bet: 7 * 100000,
                min: 7 * 100000,
            });
        }
    }
);

HU.findOne({ game: "caothap", type: 500000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 500000,
                red: true,
                bet: 7 * 500000,
                min: 7 * 500000,
            });
        }
    }
);

// xu
HU.findOne({ game: "caothap", type: 20, red: false }, {}, function(err, data) {
    if (!data) {
        HU.create({
            game: "caothap",
            type: 20,
            red: false,
            bet: 7 * 20,
            min: 7 * 20,
        });
    }
});

HU.findOne({ game: "caothap", type: 50, red: false }, {}, function(err, data) {
    if (!data) {
        HU.create({
            game: "caothap",
            type: 50,
            red: false,
            bet: 7 * 50,
            min: 7 * 50,
        });
    }
});

HU.findOne({ game: "caothap", type: 50000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 50000,
                red: false,
                bet: 350000,
                min: 350000,
            });
        }
    }
);

HU.findOne({ game: "caothap", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 100,
                red: false,
                bet: 7 * 100,
                min: 7 * 100,
            });
        }
    }
);

HU.findOne({ game: "caothap", type: 200, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "caothap",
                type: 200,
                red: false,
                bet: 7 * 200,
                min: 7 * 200,
            });
        }
    }
);

// thiết lập Hũ AngryBirds
// red
HU.findOne({ game: "arb", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "arb",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "arb", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "arb",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "arb", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "arb",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "arb", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "arb",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "arb", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "arb",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "arb", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "arb",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// thiết lập Hũ Candy
// red
HU.findOne({ game: "candy", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "candy",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "candy", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "candy",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "candy", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "candy",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "candy", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "candy",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "candy", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "candy",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "candy", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "candy",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// thiết lập Hũ Long Lân
// red
HU.findOne({ game: "long", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "long",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "long", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "long",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "long", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "long",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "long", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "long",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "long", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "long",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "long", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "long",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);
// thiết lập Hũ Zeus
// red
HU.findOne({ game: "Zeus", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "Zeus",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "Zeus", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "Zeus",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "Zeus", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "Zeus",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "Zeus", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "Zeus",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "Zeus", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "Zeus",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "Zeus", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "Zeus",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// thiết lập Hũ Vương Quốc Red
// red
HU.findOne({ game: "tamhung", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "tamhung",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "tamhung", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "tamhung",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "tamhung", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "tamhung",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "tamhung", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "tamhung",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "tamhung", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "tamhung",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "tamhung", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "tamhung",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// thiết lập Hũ SexAndZen
// red
HU.findOne({ game: "sexandzen", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "sexandzen",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "sexandzen", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "sexandzen",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "sexandzen", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "sexandzen",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "sexandzen", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "sexandzen",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "sexandzen", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "sexandzen",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "sexandzen", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "sexandzen",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);


// thiết lập Hũ roy
// red
HU.findOne({ game: "roy", type: 100, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "roy",
                type: 100,
                red: true,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "roy", type: 1000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "roy",
                type: 1000,
                red: true,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "roy", type: 10000, red: true }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "roy",
                type: 10000,
                red: true,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);

// xu
HU.findOne({ game: "roy", type: 100, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "roy",
                type: 100,
                red: false,
                bet: 5000 * 100,
                min: 5000 * 100,
            });
        }
    }
);

HU.findOne({ game: "roy", type: 1000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "roy",
                type: 1000,
                red: false,
                bet: 5000 * 1000,
                min: 5000 * 1000,
            });
        }
    }
);

HU.findOne({ game: "roy", type: 10000, red: false }, {},
    function(err, data) {
        if (!data) {
            HU.create({
                game: "roy",
                type: 10000,
                red: false,
                bet: 5000 * 10000,
                min: 5000 * 10000,
            });
        }
    }
);