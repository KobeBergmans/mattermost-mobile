// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {
    BackHandler,
    ScrollView,
} from 'react-native';
import Katex from 'react-native-katex';
import {SafeAreaView} from 'react-native-safe-area-context';

import {popTopScreen} from '@actions/navigation';
import {makeStyleSheetFromTheme} from '@utils/theme';

export default class Latex extends React.PureComponent {
    static propTypes = {
        theme: PropTypes.object.isRequired,
        content: PropTypes.string.isRequired,
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleAndroidBack);
    }

    handleAndroidBack = () => {
        popTopScreen();
        return true;
    };

    render() {
        const style = getStyleSheet(this.props.theme);

        const inlineStyle = `
html, body {
  background-color: #fafafa;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  font-size: 4em;
  margin-left: 50px;
  margin-top: 50px;
}
`;

        return (
            <SafeAreaView
                edges={['bottom', 'left', 'right']}
                style={style.scrollContainer}
            >
                <ScrollView
                    style={[style.scrollContainer]}
                    contentContainerStyle={style.code}
                >
                    <Katex
                        expression={this.props.content}
                        style={{flex: 1}}
                        inlineStyle={inlineStyle}
                        displayMode={true}
                        throwOnError={false}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme(() => {
    return {
        scrollContainer: {
            flex: 1,
        },
        container: {
            minHeight: '100%',
            flexDirection: 'row',
        },
        code: {
            minHeight: '100%',
            flexDirection: 'row',
            paddingHorizontal: 6,
        },
    };
});
