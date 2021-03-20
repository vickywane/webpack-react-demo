var Trello = require('trello-node-api')(apiKey, oauthToken);

var apiKey = 'fc0d8354e959f3c387122ccc5776a359'

var oauthToken =
'9379af73be3d3ec4fdd5363094fd7343b5c42c6ca145d277a8a861111b024640'


var data = {
        name: 'BOARD_NAME', // REQUIRED
        defaultLabels: false,
        defaultLists: false,
        desc: 'Board description.',
        idOrganization: 'ORGANIZATION_ID',
        idBoardSource: 'BOARD_ID',
        keepFromSource: 'none',
        powerUps: 'all',
        prefs_permissionLevel: 'private',
        prefs_voting: 'disabled',
        prefs_comments: 'members',
        prefs_invitations: 'members',
        prefs_selfJoin: true,
        prefs_cardCovers: true,
        prefs_background: 'blue',
        prefs_cardAging: 'regular'
    };
    Trello.board.create(data).then(function (response) {
        console.log('response ', response);
    }).catch(function (error) {
        console.log('error', error);
    });    

console.log('file here')
