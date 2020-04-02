export const inbuiltTemplates = [
    {
        title: "Simple Dashboard",
        inbuilt: true,
        widgets: [
            {
                id: "1",
                key: "technical_analysis",
                name: "Technical analysis",
                checked: false,
                multiple: true,
                data: ["XRP-BTC"]
            },
            {
                id: "2",
                key: "crypto_screener",
                name: "Crypto screener",
                checked: false,
                multiple: false,
            },
            {
                id: "3",
                key: "rising_falling",
                name: "Rising / Falling",
                checked: false,
                multiple: false,
            },
            {
                id: "4",
                key: "mini_graph",
                name: "Mini graph",
                checked: true,
                multiple: true,
                data: ["XRP-BTC", "LTC-BTC", "ETH-BTC", "XRP-ETH"]
            },
            {
                id: "5",
                key: "activity",
                name: "Activity",
                checked: true,
                multiple: false,
            },
            {
                id: "6",
                key: "portfolio",
                name: "Portfolio",
                checked: true,
                multiple: false,
            },
            {
                id: "7",
                key: "news",
                name: "News",
                checked: true,
                multiple: false
            },
            {
                id: "8",
                key: "candle_stick",
                name: "Candle Stick",
                checked: false,
                multiple: true,
                data: ["XRP-BTC"]
            }
        ],
        layouts: {
            "lg": [
                {
                    "w": 2,
                    "h": 1,
                    "x": 8,
                    "y": 0,
                    "i": "mini_graph0",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 2,
                    "h": 1,
                    "x": 4,
                    "y": 0,
                    "i": "mini_graph1",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 2,
                    "h": 1,
                    "x": 6,
                    "y": 0,
                    "i": "mini_graph2",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 2,
                    "h": 1,
                    "x": 2,
                    "y": 0,
                    "i": "mini_graph3",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 4,
                    "h": 3,
                    "x": 2,
                    "y": 1,
                    "i": "activity",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 4,
                    "h": 3,
                    "x": 6,
                    "y": 1,
                    "i": "portfolio",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 8,
                    "h": 3,
                    "x": 2,
                    "y": 4,
                    "i": "news",
                    "moved": false,
                    "static": false
                }
            ],
            "md": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph3"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                },
            ],
            "sm": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph3"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                }
            ],
            "xs": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph3"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                }
            ],
            "xxs": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph3"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                }
            ]
        }
    },
    {
        title: "Advanced Dashboard",
        inbuilt: true,
        widgets: [
            {
                id: "1",
                key: "technical_analysis",
                name: "Technical analysis",
                checked: true,
                multiple: true,
                data: ["XRP-BTC"]
            },
            {
                id: "2",
                key: "crypto_screener",
                name: "Crypto screener",
                checked: true,
                multiple: false,
            },
            {
                id: "3",
                key: "rising_falling",
                name: "Rising / Falling",
                checked: true,
                multiple: false,
            },
            {
                id: "4",
                key: "mini_graph",
                name: "Mini graph",
                checked: true,
                multiple: true,
                data: ["XRP-BTC", "XRP-BTC", "XRP-BTC"]
            },
            {
                id: "5",
                key: "activity",
                name: "Activity",
                checked: true,
                multiple: false,
            },
            {
                id: "6",
                key: "portfolio",
                name: "Portfolio",
                checked: true,
                multiple: false,
            },
            {
                id: "7",
                key: "news",
                name: "News",
                checked: true,
                multiple: false
            },
            {
                id: "8",
                key: "candle_stick",
                name: "Candle Stick",
                checked: true,
                multiple: true,
                data: ["XRP-BTC"]
            }
        ],
        layouts: {
            "lg": [
                {
                    "w": 6,
                    "h": 3,
                    "x": 6,
                    "y": 0,
                    "i": "technical_analysis0",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 12,
                    "h": 3,
                    "x": 0,
                    "y": 8,
                    "i": "crypto_screener",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 12,
                    "h": 3,
                    "x": 0,
                    "y": 11,
                    "i": "rising_falling",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 2,
                    "h": 1,
                    "x": 10,
                    "y": 3,
                    "i": "mini_graph0",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 2,
                    "h": 1,
                    "x": 6,
                    "y": 3,
                    "i": "mini_graph1",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 2,
                    "h": 1,
                    "x": 8,
                    "y": 3,
                    "i": "mini_graph2",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 6,
                    "h": 2,
                    "x": 0,
                    "y": 3,
                    "i": "activity",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 6,
                    "h": 3,
                    "x": 0,
                    "y": 0,
                    "i": "portfolio",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 6,
                    "h": 3,
                    "x": 0,
                    "y": 5,
                    "i": "news",
                    "moved": false,
                    "static": false
                },
                {
                    "w": 6,
                    "h": 4,
                    "x": 6,
                    "y": 4,
                    "i": "candle_stick0",
                    "moved": false,
                    "static": false
                }
            ],
            "md": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "crypto_screener"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "rising_falling"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "candle_stick0"
                }
            ],
            "sm": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "crypto_screener"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "rising_falling"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                }
            ],
            "xs": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "crypto_screener"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "rising_falling"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "candle_stick0"
                }
            ],
            "xxs": [
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "crypto_screener"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "rising_falling"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "candle_stick0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "crypto_screener"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "rising_falling"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "candle_stick0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "technical_analysis0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "crypto_screener"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "rising_falling"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "candle_stick0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "technical_analysis0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "crypto_screener"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "rising_falling"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph0"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph1"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "mini_graph2"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "activity"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "portfolio"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "news"
                },
                {
                    "h": 3,
                    "w": 12,
                    "y": 0,
                    "x": 0,
                    "i": "candle_stick0"
                }
            ]
        }
    }
]