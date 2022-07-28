const themePalette ={
    primary:'#440e62',
    primaryDarker:'#310649',
    primaryLighter:'#872cba',
    alternate:'#ded000',
    grey:'#aaaaaa',
    greyDarker:'#888888',
    greyLighter:'#cccccc'
}

export const royalTheme = {
    
    Button: {
        buttonStyle: {
            raised: true,
            borderRadius: 15,
            backgroundColor: themePalette.primary,
        },
        titleStyle: {
            color: themePalette.alternate
        },
        disabledStyle:{
            backgroundColor:themePalette.greyDarker,
        },
        icon:{
            color: themePalette.alternate,            
        },
        type: 'clear'
    },

    FAB:{
        buttonStyle: {
            raised: true,
            borderRadius: 15,
            backgroundColor: themePalette.primary,
        },
        titleStyle: {
            color: themePalette.alternate
        },
        icon:{
            color: themePalette.alternate,            
        },
    },

    Text: {
        h1Style: {
            color: themePalette.primaryDarker,
            fontWeight: 'bold',
            fontFamily: 'serif'
            /*Disabled for web display, add back for iOS/Android
                fontFamily: (Platform.OS === 'ios') ? 'Baskerville' : 'serif',
            */
        },
        h2Style: {
            color: themePalette.primaryLighter,
            fontSize: 26,
            margin:10
        },
        h3Style: {
            color: themePalette.primaryLighter,
            fontSize: 20,
            margin:5
        },
        style:{
            margin:5
        }
    },

    Avatar: {
        avatarStyle: {
            borderColor: themePalette.primary,
            borderWidth: 1,
        },
        size:50
    },

    Divider:{
        color: themePalette.primaryLighter,        
        width: 2
    }
};