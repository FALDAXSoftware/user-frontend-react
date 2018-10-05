/* In-build packages */
import React, { Component } from "react"
import { ComposableMap,ZoomableGroup,Geographies,Geography} from "react-simple-maps";
import { connect } from "react-redux";
import {Tooltip,actions,} from "redux-tooltip";
import styled from 'styled-components';
import tooltip from 'wsdm-tooltip';

import { Row, Col, Modal, Button, Input, Icon, notification } from 'antd';

/* Components */

import { Section_3, Container } from '../../../styled-components/homepage/style';

const { show, hide } = actions;

const tip = tooltip({
    styles: {
        "color": "#282528",
        "text-transform": 'uppercase',
        "font-family": 'Open Sans',
        "font-size": "15px",
        "background-color": "white",
        "border-radius": "3px",
    },
});


/* Styled componets */
const ReactSimpleMapWrapper = styled.div`
  width: 100%;
  maxWidth: 980px;
  margin: "0 auto";
  fontFamily: "Roboto, sans-serif";
  text-align: center;
  cursor: pointer;
  background-image: "-moz-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
  background-image: "-webkit-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
  background-image: "-ms-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
`;

const Forth_head = styled.div`
    margin-top: 55px;
    margin-bottom: 50px;
    text-align: center;
`;

const Forth_head_span = styled.span`
    font-family: 'Open sans';
    font-size: 42px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
`;

const Forth_head_p = styled.p`
    font-family: 'Open sans';
    font-size: 13px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
    margin-top: 15px;
`;

const Back_link = styled.a`
    vertical-align: middle;
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    position: 'absolute';
    left: 50%;
`;

const Link_wrap = styled.div`
    margin-top:50px;
`;
const Icon1 = styled.i`
    vertical-align: middle;
    color: rgb( 15, 71, 123 );    
`;

const colorScale = [
    '#008000',
    '#168fff',
    '#fb0202',
    '#ffff00'
];

const UsaMap = styled.div`
`;

//Myanmar, Somaliland new added 
const countries = [
    { name: 'Afghanistan', legality: 'Neutral', color: '#ADD8E6' },
    { name: 'Bangladesh', legality: 'Illegal', color: 'red' },
    { name: 'Bhutan', legality: 'Neutral', color: '#ADD8E6' },
    { name: 'Brunei', legality: 'Neutral', color: '#ADD8E6' },
    { name: 'Burma', legality: 'Neutral', color: '#ADD8E6' },
    { name: 'Cambodia', legality: 'Illegal', color: 'red' },
    { name: 'China', legality: 'Illegal', color: 'red' },
    { name: 'East Timor', legality: 'Neutral', color: '#ADD8E6' },
    { name: 'Hong Kong', legality: 'Legal', color: 'green'},
    { name: 'India', legality: 'Legal', color: 'green'},
    { name: 'Indonesia', legality: 'Illegal', color: 'red' },
    { name: 'Iran', legality: 'Illegal', color: 'red' },
    { name: 'Japan', legality: 'Legal', color: 'green'},
    { name: 'Laos', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Macau', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Malaysia', legality: 'Legal', color: 'green'},
    { name: 'Maldives', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Mongolia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Nepal', legality: 'Illegal', color: 'red'},
    { name: 'Dem. Rep. Korea', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Pakistan', legality: 'Illegal', color: 'green'},
    { name: 'Philippines', legality: 'Legal', color: 'green'},
    { name: 'Singapore', legality: 'Legal', color: 'green'},
    { name: 'Korea', legality: 'Legal', color: 'green'},
    { name: 'Sri Lanka', legality: 'Neutral', color: 'green'},
    { name: 'Taiwan', legality: 'Illegal', color: 'red'},
    { name: 'Vietnam', legality: 'Special Case', color: '#ADD8E6'},
    { name : 'Somaliland', legality: 'Neutral', color: '#ADD8E6'},
    { name : 'Myanmar', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Estonia', legality: 'Legal', color: 'green'},
    { name: 'Latvia', legality: 'Legal', color: 'green'},
    { name: 'Lithuania', legality: 'Legal', color: 'green'},
    { name: 'Armenia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Azerbaijan', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Belarus', legality: 'Legal', color: 'green'},
    { name: 'Kazakhstan', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Kyrgyzstan', legality: 'Legal', color: 'green'},
    { name: 'Moldova', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Russia', legality: 'Legal', color: 'green'},
    { name: 'Tajikistan', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Turkmenistan', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Ukraine', legality: 'Legal', color: 'green'},
    { name: 'Uzbekistan', legality: 'Legal', color: 'green'},
    { name: 'Albania', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Bosnia & Herzegovina', legality: 'Legal', color: 'green'},
    { name: 'Bulgaria', legality: 'Legal', color: 'green'},
    { name: 'Croatia', legality: 'Legal', color: 'green'},
    { name: 'Czech Rep.', legality: 'Legal', color: 'green'},
    { name: 'Hungary', legality: 'Legal', color: 'green'},
    { name: 'Macedonia', legality: 'Legal', color: 'green'},
    { name: 'Poland', legality: 'Legal', color: 'green'},
    { name: 'Romania', legality: 'Legal', color: 'green'},
    { name: 'Serbia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Slovakia', legality: 'Legal', color: 'green'},
    { name: 'Slovenia', legality: 'Legal', color: 'green'},
    { name: 'Anguilla', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Antigua & Barbuda', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Argentina', legality: 'Legal', color: 'green'},
    { name: 'Aruba', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Bahamas, The', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Barbados', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Belize', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Bolivia', legality: 'Illegal', color: 'red'},
    { name: 'Brazil', legality: 'Legal', color: 'green'},
    { name: 'British Virgin Is.', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Cayman Islands', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Chile', legality: 'Legal', color: 'green'},
    { name: 'Colombia', legality: 'Illegal', color: 'red'},
    { name: 'Costa Rica', legality: 'Legal', color: 'green'},
    { name: 'Cuba', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Dominica', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Dominican Rep.', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Ecuador', legality: 'Illegal', color: 'red'},
    { name: 'El Salvador', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'French Guiana', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Grenada', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Guadeloupe', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Guatemala', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Guyana', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Haiti', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Honduras', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Jamaica', legality: 'Legal', color: 'green'},
    { name: 'Martinique', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Mexico', legality: 'Legal', color: 'green'},
    { name: 'Montserrat', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Netherlands Antilles', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Nicaragua', legality: 'Legal', color: 'green'},
    { name: 'Panama', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Paraguay', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Peru', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Puerto Rico', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Saint Kitts & Nevis', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Saint Lucia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Saint Vincent and the Grenadines', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Suriname', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Trinidad & Tobago', legality: 'Legal', color: 'green'},
    { name: 'Turks & Caicos Is', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Uruguay', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Venezuela', legality: 'Legal', color: 'green'},
    { name: 'Virgin Islands', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Bahrain', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Cyprus', legality: 'Legal', color: 'green'},
    { name: 'Gaza Strip', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Iraq', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Israel', legality: 'Legal', color: 'green'},
    { name: 'Jordan', legality: 'Legal', color: 'green'},
    { name: 'Kuwait', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Lebanon', legality: 'Legal', color: 'green'},
    { name: 'Oman', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Qatar', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Saudi Arabia', legality: 'Illegal', color: 'red'},
    { name: 'Syria', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Turkey', legality: 'Legal', color: 'green'},
    { name: 'United Arab Emirates', legality: 'Illegal', color: 'red' },
    { name: 'West Bank', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Yemen', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Algeria', legality: 'Illegal', color: 'red'},
    { name: 'Egypt', legality: 'Illegal', color: 'red'},
    { name: 'Libya', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Morocco', legality: 'Illegal', color: 'red'},
    { name: 'Tunisia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'W. Sahara', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Bermuda', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Canada', legality: 'Legal', color: 'green'},
    { name: 'Greenland', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'St Pierre & Miquelon', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'United States', legality: 'Legal', color: 'yellow'},
    { name: 'American Samoa', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Australia', legality: 'Legal', color: 'green'},
    { name: 'Cook Islands', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Fiji', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'French Polynesia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Guam', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Kiribati', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Marshall Islands', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Micronesia, Fed. St.', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'N. Mariana Islands', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Nauru', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'New Caledonia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'New Zealand', legality: 'Legal', color: 'green'},
    { name: 'Palau', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Papua New Guinea', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Samoa', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Solomon Islands', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Tonga', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Tuvalu', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Vanuatu', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Wallis and Futuna', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Angola', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Benin', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Botswana', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Burkina Faso', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Burundi', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Cameroon', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Cape Verde', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Central African Rep.', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Chad', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Comoros', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Dem. Rep. Congo', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Congo', legality: 'Neutral', color: '#ADD8E6'},
    { name: "Côte d'Ivoire", legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Djibouti', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Eq. Guinea', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Eritrea', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Ethiopia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Gabon', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Gambia, The', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Ghana', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Guinea', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Guinea-Bissau', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Kenya', legality: 'Legal', color: 'green'},
    { name: 'Lesotho', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Liberia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Madagascar', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Malawi', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Mali', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Mauritania', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Mauritius', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Mayotte', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Mozambique', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Namibia', legality: 'Legal', color: 'green'},
    { name: 'Niger', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Nigeria', legality: 'Legal', color: 'green'},
    { name: 'Reunion', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Rwanda', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Saint Helena', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Sao Tome & Principe', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Senegal', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Seychelles', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Sierra Leone', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Somalia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'South Africa', legality: 'Legal', color: 'green'},
    { name: 'S. Sudan', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Sudan', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Swaziland', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Tanzania', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Togo', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Uganda', legality: 'Legal', color: 'green'},
    { name: 'Zambia', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Zimbabwe', legality: 'Legal', color: 'green'},
    { name: 'Andorra', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Austria', legality: 'Legal', color: 'green'},
    { name: 'Belgium', legality: 'Legal', color: 'green'},
    { name: 'Denmark', legality: 'Legal', color: 'green'},
    { name: 'Faroe Islands', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Finland', legality: 'Legal', color: 'green'},
    { name: 'France', legality: 'Legal', color: 'green'},
    { name: 'Germany', legality: 'Legal', color: 'green'},
    { name: 'Gibraltar', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Greece', legality: 'Legal', color: 'green'},
    { name: 'Guernsey', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Iceland', legality: 'Legal', color: 'green'},
    { name: 'Isle of Man', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Italy', legality: 'Legal', color: 'green'},
    { name: 'Jersey', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Liechtenstein', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Luxembourg', legality: 'Legal', color: 'green'},
    { name: 'Malta', legality: 'Legal', color: 'green'},
    { name: 'Monaco', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Netherlands', legality: 'Legal', color: 'green'},
    { name: 'Norway', legality: 'Legal', color: 'green'},
    { name: 'Portugal', legality: 'Legal', color: 'green'},
    { name: 'San Marino', legality: 'Neutral', color: '#ADD8E6'},
    { name: 'Spain', legality: 'Legal', color: 'green'},
    { name: 'Sweden', legality: 'Legal', color: 'green'},
    { name: 'Switzerland', legality: 'Legal', color: 'green'},
    { name: 'United Kingdom', legality: 'Legal', color: 'green'},

    /* sub-region */
    { name: 'Colorado', region: 'United States', legality: 'Legal', color: 'green' },
    { name: 'Texas', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Arizona', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'New Mexico', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Oklahoma', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Kansas', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Utah', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Wyoming', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Nebraska', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Missouri', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'California', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Nevada', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Oregon', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Idaho', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Washington', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Montana', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'North Dakota', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'South Dakota', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Minnesota', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Wisconsin', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Michigan', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Indiana', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Illinois', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Ohio', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Iowa', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Pennsylvania', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'New York', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Vermont', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'New Hampshire', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Massachusetts', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Connecticut', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'West virginia', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Virginia', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'New Jersey', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Arkansas', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Tennessee', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'North Carolina', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'South Carolina', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Georgia', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Arkansas', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Louisiana', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Florida', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Alaska', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Hawaii', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Mississippi', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Alabama', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Kentucky', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Mary Land', region: 'United States', legality: 'Legal', color: 'yellow' },
    { name: 'Maine', region: 'United States', legality: 'Legal', color: 'yellow' },
];

let countryColor = function(text) {
    for(var i=0;i<countries.length;i++) {
        if(countries[i].name==text) {
            return countries[i].color;
        }
    }
    return '#ECEFF1';
};

/* Component defination start here */
class Home_four extends Component 
{
    constructor() {
        super();
        this.handleMove = this.handleMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.state = { visible: false, modal: '', usaMap: false ,email_msg:""};
    }

    handleMove(geography, evt) 
    {
        const x = evt.clientX;
        const y = evt.clientY + window.pageYOffset;
        this.props.dispatch(show({ origin: { x, y }, content: geography.properties.name }));
    }

    handleLeave() 
    {
        this.props.dispatch(hide());
    }

    handleOk() {
        this.setState({ visible: false });
    }

    handleCancel() {
        this.setState({ visible: false });
    }
    showModal(modal) {
        if(modal.properties.name=='United States') {
            this.setState({ usaMap: true, email_address: '' });
        } else if(modal.properties.name=="Vietnam") { 
            //skip for now
        } else {
            for(var i=0;i<countries.length;i++) {
                if(countries[i].region=="United States"){
                    if(modal.properties.name=="Colorado")
                    {
                        this.setState({ visible: true, modal: 'Legal', email_address: '' });
                        return;
                    } else {
                        this.setState({ visible: true, modal: 'usa_neutral', email_address: '' });
                        return;
                    }
                } else if(countries[i].name==modal.properties.name) {
                    this.setState({ visible: true, modal: countries[i].legality, email_address: '' });
                    return;
                }
            }
        }
    }

    hideModal() {
        this.setState({ visible: false, usaMap: false, email_address: '' });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tooltip && this.props.tooltip.show !== nextProps.tooltip.show) {
            if (this.props.tooltip.show === true) {
                tip.hide(nextProps.tooltip.content);
            } else {
                tip.show(nextProps.tooltip.content);
            }
        }
        if (nextProps.tooltip && nextProps.tooltip.origin && nextProps.tooltip.origin.x && nextProps.tooltip.origin.y) {
            tip.position({ pageX: nextProps.tooltip.origin.x, pageY: nextProps.tooltip.origin.y })
        }
    }

    send_email() {
        const values = { email: this.state.email_address};
        this.setState({email_address: '' });
        var re=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        if(re.test(this.state.email_address))
        {

            this.setState({email_msg:""})
                fetch("http://18.191.87.133:8084/users/email-subscription",{
                    method:"post",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(values)
                })
                .then(response => response.json())
                .then((responseData) => {
                    if(responseData.status==500){
                        this.openNotification1();
                    } else {
                        this.openNotification();
                        this.setState({visible:false,email_msg:""})
                    }
                })
                .catch(error => { console.log(error) })
        }
        else
        {
            this.setState({email_msg:"*email address not valid"})
        }
    }

    openNotification(){
        notification.open({
          message: 'Thank You',
          description: 'You will recieve an Email shortly',
          duration: 6,
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
      };
    openNotification1(){
        notification.open({
        message: 'Error',
        description: 'Sorry, There is some error',
        duration: 6,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    };

    render() {

        return (
            
            <Section_3>
                <Container>
                    <Row>
                        <Col>
                            <Forth_head>
                                <Forth_head_span> Service Availability</Forth_head_span>
                                <Forth_head_p>Mouse-over or click on your country to view our operational status.</Forth_head_p>
                            </Forth_head>
                            <ReactSimpleMapWrapper>
                                { !this.state.usaMap ?
                                <ComposableMap
                                    projectionConfig={{
                                        scale: 205,
                                        rotation: [-11, 0, 0],
                                    }}
                                    width={980}
                                    height={551}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    >
                                    <ZoomableGroup center={[0, 20]} disablePanning>
                                        <Geographies geography="/assets/world-50m.json">
                                            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                                <Geography
                                                    key={i}
                                                    geography={geography}
                                                    projection={projection}
                                                    onMouseMove={this.handleMove}
                                                    onClick={(modal)=>this.showModal(modal)}
                                                    onMouseLeave={this.handleLeave}
                                                    style={{
                                                        default: {
                                                            fill: countryColor(geography.properties.name),
                                                            stroke: "#607D8B",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                            
                                                        },
                                                        hover: {
                                                            fill: countryColor(geography.properties.name),
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        },
                                                        pressed: {
                                                            fill: "#168fff",
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        }
                                                    }}
                                                    />
                                            ))}
                                        </Geographies>
                                    </ZoomableGroup>
                                </ComposableMap>
                                :
                                <UsaMap>
                                    <Link_wrap>
                                        <Back_link onClick={() => this.hideModal()}> 
                                            <Icon1 className="material-icons"> keyboard_backspace </Icon1>
                                            Back To World Map 
                                        </Back_link>
                                    </Link_wrap>
                                    
                                    <ComposableMap
                                        width={980}
                                        height={551}
                                        projection="albersUsa"
                                        projectionConfig={{ scale: 900 }}
                                        style={{width: '900px', height: '300px'}}
                                        >
                                        <ZoomableGroup>
                                            <Geographies
                                            disableOptimization
                                            geography="/assets/us-albers.json"
                                            >
                                            {(geos, proj) =>
                                                geos.map((geo, i) => (
                                                <Geography
                                                    key={i}
                                                    geography={geo}
                                                    projection={proj}
                                                    style={{ default: { fill: "#CFD8DC" } }}
                                                    onClick={(modal)=>this.showModal(modal)}
                                                    onMouseMove={this.handleMove}
                                                    onMouseLeave={this.handleLeave}
                                                    style={{
                                                        default: {
                                                            fill: countryColor(geo.properties.name),
                                                            stroke: "#607D8B",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        },
                                                        hover: {
                                                            fill: countryColor(geo.properties.name),
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        },
                                                        pressed: {
                                                            fill: "#168fff",
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        }
                                                    }}
                                                />
                                                ))
                                            }
                                            </Geographies>
                                        </ZoomableGroup>
                                    </ComposableMap>
                                </UsaMap>
                            }
                            </ReactSimpleMapWrapper>
                        </Col>
                    </Row>
                </Container>
                <div className="simple-maps">
                    <Modal
                        title={<img src="./images/Homepage/Footer_logo.png"/>}
                        visible={this.state.visible}
                        onOk={(e)=>this.handleOk()}
                        onCancel={(e)=>this.handleCancel()}
                        footer={null}
                        width={520}
                        height={150}
                        className="simple-maps"
                        >
                        {
                            this.state.modal==='Legal'?
                            <div>
                                <p>All FALDAX services are available here. Start trading now!</p>
                                <div style={{minHeight: '20px'}}>
                                    <Button style={{float: 'right', color: 'green', borderColor: 'green'}} disabled> TRADE NOW </Button>
                                </div>
                            </div>:""
                        }
                        {
                            this.state.modal==='Neutral'?
                            <div>
                                <p>All FALDAX services are available here! This country has not made an official determination regarding cryptocurrency and so their stance is considered 'Neutral'. We are continuously monitoring legislation changes and will update our operational status here and notify you if anything changes.</p>
                            </div>:""
                        }
                        {
                            this.state.modal==='Illegal'?
                            <div>
                                <p>All FALDAX services are unavailable here due to legal reasons. We are constantly monitoring this situation in hopes of legislation changes. Please enter your e-mail address below if you would like updates.</p>
                                <label style={{color: 'green'}}> Email: </label>
                                <Input placeholder="Please enter your email address" style={{color: 'green', borderColor: 'green' }} value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); } }/>
                                <span style={{color:"red"}}>{this.state.email_msg}</span>
                                <div style={{marginTop: '20px', minHeight: '20px'}}>
                                    <Button style={{float: 'right', color: 'green', borderColor: 'green'}} onClick={()=>this.send_email()}> RECEIVE UPDATE </Button>
                                </div>
                            </div>:""
                        }
                        {
                            this.state.modal==="usa_neutral" ?
                            <div>
                                <p>We are currently engaged in the licensing process in this state. Enter your e-mail address below and we will notify you the moment you can start trading.</p>
                                <label style={{color: 'green'}}> Email: </label>
                                <Input placeholder="Please enter your email address" style={{color: 'green', borderColor: 'green' }} value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); } }/>
                                <span style={{color:"red"}}>{this.state.email_msg}</span>
                                <div style={{marginTop: '20px', minHeight: '20px'}}>
                                    <Button style={{float: 'right', color: 'green', borderColor: 'green'}} onClick={()=>this.send_email()}> RECEIVE UPDATE </Button>
                                </div>
                            </div>:""
                        }                    
                    </Modal>
                </div>
            </Section_3>

        )
    }
}

export default connect(
    (state) => {
        return { tooltip: state.tooltip.default };
    }
)(Home_four);
