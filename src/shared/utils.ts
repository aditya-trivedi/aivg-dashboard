export const sideNavToolsIconList = [
    {
        icon : 'videocam',
        text : 'Convert Article to Video',
        router_link : 'article-to-video',
        isDisabled : false,
        imagePath :  'assets/testing.png',
        toolTipText: 'Beta Testing'
    },
    {
        icon : 'short_text',
        text : 'Convert Text to Audio',
        router_link : 'article-to-video',
        isDisabled : false,
        imagePath :  'assets/coming-soon.png',
        toolTipText: 'Coming soon'
    },
    {
        icon : 'subtitles',
        text : 'Add Subtitles to Video',
        router_link : 'article-to-video',
        isDisabled : false,
        imagePath :  'assets/coming-soon.png',
        toolTipText: 'Coming soon'
    },
    {
        icon : 'image_search',
        text : 'Generate images for article',
        router_link : 'article-to-video',
        isDisabled : false,
        imagePath :  'assets/coming-soon.png',
        toolTipText: 'Coming soon'
    },

]

export const normalVoiceSampleAvailableLanguages = [
    {
        displayText : 'English',
        value : 'english',
        audioLink : 'https://s3.us-east-1.amazonaws.com/aivid-local/1/voiceover/ply.a5dbfdd0-4f30-4d9a-a371-9a89370a433b.mp3'
    },
    {
        displayText : 'Hindi',
        value : 'hindi',
        audioLink : 'https://s3.us-east-1.amazonaws.com/aivid-local/1/voiceover/ply.27ce71ed-a27c-4baa-86a8-32815cc856ab.mp3'

    },
    {
        displayText : 'Spanish',
        value : 'spanish',
        audioLink : 'https://s3.us-east-1.amazonaws.com/aivid-local/1/voiceover/ply.289f4409-847b-4810-8216-ac66ba56169c.mp3'
    }
]


export const paidVoiceSampleAvailableLanguages = [
    {
        displayText : 'English',
        value : 'english',
        audioLink : 'https://aivid-local.s3.amazonaws.com/1/voiceover/elbs1bc2213bb82440e0af97a0b0304af20a'
    },
    {
        displayText : 'Hindi',
        value : 'hindi',
        audioLink : 'https://aivid-local.s3.amazonaws.com/1/voiceover/elbs667e3da7835f4b8b94a19c3566686561'

    },
    {
        displayText : 'Spanish',
        value : 'spanish',
        audioLink : 'https://aivid-local.s3.amazonaws.com/1/voiceover/elbs0962276429c04ffd9b4e52f67ef9a503'
    }
]

export const videoAspectRatio = [
    {
        displayText : '1 : 1',
        value : 'one_one'
    },
    {
        displayText : '3 : 4',
        value : 'three_four'
    },
    {
        displayText : '4 : 3',
        value : 'four_three'
    },
    {
        displayText : '16 : 9',
        value : 'sixteen_nine'
    },
    {
        displayText : '9 : 16',
        value : 'nine_sixteen'
    }
]