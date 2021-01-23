import {HttpHeaders} from '@angular/common/http';

export const Config = {    
    // apiURL: 'http://localhost:24285/api/', 
    apiURL: 'http://masafiapi.roufmlp.com/api/',    
    apiURLLocal: 'http://localhost:64947/requestAcceptor.aspx/',   
    isLocal: false,
    isMobile: true,
    months: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    MetaData: {
      AppSourceCode: '',      
      UniqueIdType: ''
    },
    countries: [{'name': 'Andorra', 'alpha2': 'AD', 'alpha3': 'AND'}, {
      'name': 'United Arab Emirates',
      'alpha2': 'AE',
      'alpha3': 'ARE'
    }, {'name': 'Afghanistan', 'alpha2': 'AF', 'alpha3': 'AFG'}, {
      'name': 'Antigua and Barbuda',
      'alpha2': 'AG',
      'alpha3': 'ATG'
    }, {'name': 'Anguilla', 'alpha2': 'AI', 'alpha3': 'AIA'}, {'name': 'Albania', 'alpha2': 'AL', 'alpha3': 'ALB'}, {
      'name': 'Armenia',
      'alpha2': 'AM',
      'alpha3': 'ARM'
    }, {'name': 'Angola', 'alpha2': 'AO', 'alpha3': 'AGO'}, {'name': 'Antarctica', 'alpha2': 'AQ', 'alpha3': 'ATA'}, {
      'name': 'Argentina',
      'alpha2': 'AR',
      'alpha3': 'ARG'
    }, {'name': 'American Samoa', 'alpha2': 'AS', 'alpha3': 'ASM'}, {
      'name': 'Austria',
      'alpha2': 'AT',
      'alpha3': 'AUT'
    }, {'name': 'Australia', 'alpha2': 'AU', 'alpha3': 'AUS'}, {'name': 'Aruba', 'alpha2': 'AW', 'alpha3': 'ABW'}, {
      'name': 'Aland Islands',
      'alpha2': 'AX',
      'alpha3': 'ALA'
    }, {'name': 'Azerbaijan', 'alpha2': 'AZ', 'alpha3': 'AZE'}, {
      'name': 'Bosnia and Herzegovina',
      'alpha2': 'BA',
      'alpha3': 'BIH'
    }, {'name': 'Barbados', 'alpha2': 'BB', 'alpha3': 'BRB'}, {'name': 'Bangladesh', 'alpha2': 'BD', 'alpha3': 'BGD'}, {
      'name': 'Belgium',
      'alpha2': 'BE',
      'alpha3': 'BEL'
    }, {'name': 'Burkina Faso', 'alpha2': 'BF', 'alpha3': 'BFA'}, {'name': 'Bulgaria', 'alpha2': 'BG', 'alpha3': 'BGR'}, {
      'name': 'Bahrain',
      'alpha2': 'BH',
      'alpha3': 'BHR'
    }, {'name': 'Burundi', 'alpha2': 'BI', 'alpha3': 'BDI'}, {'name': 'Benin', 'alpha2': 'BJ', 'alpha3': 'BEN'}, {
      'name': 'Bermuda',
      'alpha2': 'BM',
      'alpha3': 'BMU'
    }, {'name': 'Brunei Darussalam', 'alpha2': 'BN', 'alpha3': 'BRN'}, {
      'name': 'Bolivia',
      'alpha2': 'BO',
      'alpha3': 'BOL'
    }, {'name': 'Brazil', 'alpha2': 'BR', 'alpha3': 'BRA'}, {'name': 'Bahamas', 'alpha2': 'BS', 'alpha3': 'BHS'}, {
      'name': 'Bhutan',
      'alpha2': 'BT',
      'alpha3': 'BTN'
    }, {'name': 'Bouvet Island', 'alpha2': 'BV', 'alpha3': 'BVT'}, {
      'name': 'Botswana',
      'alpha2': 'BW',
      'alpha3': 'BWA'
    }, {
      'name': 'Belarus',
      'alpha2': 'BY',
      'alpha3': 'BLR'
    }, {'name': 'Belize', 'alpha2': 'BZ', 'alpha3': 'BLZ'}, {
      'name': 'Canada',
      'alpha2': 'CA',
      'alpha3': 'CAN'
    }, {'name': 'Cocos (Keeling) Islands', 'alpha2': 'CC', 'alpha3': 'CCK'}, {
      'name': 'Democratic Republic of the Congo',
      'alpha2': 'CD',
      'alpha3': 'COD'
    }, {'name': 'Central African Republic', 'alpha2': 'CF', 'alpha3': 'CAF'}, {
      'name': 'Congo',
      'alpha2': 'CG',
      'alpha3': 'COG'
    }, {'name': 'Switzerland', 'alpha2': 'CH', 'alpha3': 'CHE'}, {
      'name': 'CÃ´te d\'Ivoire',
      'alpha2': 'CI',
      'alpha3': 'CIV'
    }, {'name': 'Cook Islands', 'alpha2': 'CK', 'alpha3': 'COK'}, {'name': 'Chile', 'alpha2': 'CL', 'alpha3': 'CHL'}, {
      'name': 'Cameroon',
      'alpha2': 'CM',
      'alpha3': 'CMR'
    }, {'name': 'China', 'alpha2': 'CN', 'alpha3': 'CHN'}, {'name': 'Colombia', 'alpha2': 'CO', 'alpha3': 'COL'}, {
      'name': 'Costa Rica',
      'alpha2': 'CR',
      'alpha3': 'CRI'
    }, {'name': 'Cape Verde', 'alpha2': 'CV', 'alpha3': 'CPV'}, {
      'name': 'Christmas Island',
      'alpha2': 'CX',
      'alpha3': 'CXR'
    }, {'name': 'Cyprus', 'alpha2': 'CY', 'alpha3': 'CYP'}, {'name': 'Czech Republic', 'alpha2': 'CZ', 'alpha3': 'CZE'}, {
      'name': 'Germany',
      'alpha2': 'DE',
      'alpha3': 'DEU'
    }, {'name': 'Djibouti', 'alpha2': 'DJ', 'alpha3': 'DJI'}, {'name': 'Denmark', 'alpha2': 'DK', 'alpha3': 'DNK'}, {
      'name': 'Dominica',
      'alpha2': 'DM',
      'alpha3': 'DMA'
    }, {'name': 'Dominican Republic', 'alpha2': 'DO', 'alpha3': 'DOM'}, {
      'name': 'Algeria',
      'alpha2': 'DZ',
      'alpha3': 'DZA'
    }, {'name': 'Ecuador', 'alpha2': 'EC', 'alpha3': 'ECU'}, {'name': 'Estonia', 'alpha2': 'EE', 'alpha3': 'EST'}, {
      'name': 'Egypt',
      'alpha2': 'EG',
      'alpha3': 'EGY'
    }, {'name': 'Western Sahara', 'alpha2': 'EH', 'alpha3': 'ESH'}, {
      'name': 'Eritrea',
      'alpha2': 'ER',
      'alpha3': 'ERI'
    }, {
      'name': 'Spain',
      'alpha2': 'ES',
      'alpha3': 'ESP'
    }, {'name': 'Ethiopia', 'alpha2': 'ET', 'alpha3': 'ETH'}, {'name': 'Finland', 'alpha2': 'FI', 'alpha3': 'FIN'}, {
      'name': 'Fiji',
      'alpha2': 'FJ',
      'alpha3': 'FJI'
    }, {'name': 'Falkland Islands (Malvinas)', 'alpha2': 'FK', 'alpha3': 'FLK'}, {
      'name': 'Micronesia, Federated States of',
      'alpha2': 'FM',
      'alpha3': 'FSM'
    }, {'name': 'Faroe Islands', 'alpha2': 'FO', 'alpha3': 'FRO'}, {'name': 'France', 'alpha2': 'FR', 'alpha3': 'FRA'}, {
      'name': 'Gabon',
      'alpha2': 'GA',
      'alpha3': 'GAB'
    }, {'name': 'United Kingdom', 'alpha2': 'GB', 'alpha3': 'GBR'}, {
      'name': 'Grenada',
      'alpha2': 'GD',
      'alpha3': 'GRD'
    }, {
      'name': 'Georgia',
      'alpha2': 'GE',
      'alpha3': 'GEO'
    }, {'name': 'French Guiana', 'alpha2': 'GF', 'alpha3': 'GUF'}, {
      'name': 'Guernsey',
      'alpha2': 'GG',
      'alpha3': 'GGY'
    }, {
      'name': 'Ghana',
      'alpha2': 'GH',
      'alpha3': 'GHA'
    }, {'name': 'Gibraltar', 'alpha2': 'GI', 'alpha3': 'GIB'}, {'name': 'Greenland', 'alpha2': 'GL', 'alpha3': 'GRL'}, {
      'name': 'Gambia',
      'alpha2': 'GM',
      'alpha3': 'GMB'
    }, {'name': 'Guinea', 'alpha2': 'GN', 'alpha3': 'GIN'}, {'name': 'Guadeloupe', 'alpha2': 'GP', 'alpha3': 'GLP'}, {
      'name': 'Greece',
      'alpha2': 'GR',
      'alpha3': 'GRC'
    }, {'name': 'South Georgia and the South Sandwich Islands', 'alpha2': 'GS', 'alpha3': 'SGS'}, {
      'name': 'Guatemala',
      'alpha2': 'GT',
      'alpha3': 'GTM'
    }, {'name': 'Guam', 'alpha2': 'GU', 'alpha3': 'GUM'}, {'name': 'Guinea-Bissau', 'alpha2': 'GW', 'alpha3': 'GNB'}, {
      'name': 'Guyana',
      'alpha2': 'GY',
      'alpha3': 'GUY'
    }, {'name': 'Hong Kong', 'alpha2': 'HK', 'alpha3': 'HKG'}, {
      'name': 'Heard Island and McDonald Mcdonald Islands',
      'alpha2': 'HM',
      'alpha3': 'HMD'
    }, {'name': 'Honduras', 'alpha2': 'HN', 'alpha3': 'HND'}, {'name': 'Croatia', 'alpha2': 'HR', 'alpha3': 'HRV'}, {
      'name': 'Haiti',
      'alpha2': 'HT',
      'alpha3': 'HTI'
    }, {'name': 'Hungary', 'alpha2': 'HU', 'alpha3': 'HUN'}, {'name': 'Indonesia', 'alpha2': 'ID', 'alpha3': 'IDN'}, {
      'name': 'Ireland',
      'alpha2': 'IE',
      'alpha3': 'IRL'
    }, {'name': 'Israel', 'alpha2': 'IL', 'alpha3': 'ISR'}, {'name': 'Isle of Man', 'alpha2': 'IM', 'alpha3': 'IMN'}, {
      'name': 'India',
      'alpha2': 'IN',
      'alpha3': 'IND'
    }, {'name': 'British Indian Ocean Territory', 'alpha2': 'IO', 'alpha3': 'IOT'}, {
      'name': 'Iraq',
      'alpha2': 'IQ',
      'alpha3': 'IRQ'
    }, {'name': 'Iran, Islamic Republic of', 'alpha2': 'IR', 'alpha3': 'IRN'}, {
      'name': 'Iceland',
      'alpha2': 'IS',
      'alpha3': 'ISL'
    }, {'name': 'Italy', 'alpha2': 'IT', 'alpha3': 'ITA'}, {'name': 'Jamaica', 'alpha2': 'JM', 'alpha3': 'JAM'}, {
      'name': 'Jordan',
      'alpha2': 'JO',
      'alpha3': 'JOR'
    }, {'name': 'Japan', 'alpha2': 'JP', 'alpha3': 'JPN'}, {'name': 'Kenya', 'alpha2': 'KE', 'alpha3': 'KEN'}, {
      'name': 'Kyrgyzstan',
      'alpha2': 'KG',
      'alpha3': 'KGZ'
    }, {'name': 'Cambodia', 'alpha2': 'KH', 'alpha3': 'KHM'}, {'name': 'Kiribati', 'alpha2': 'KI', 'alpha3': 'KIR'}, {
      'name': 'Comoros',
      'alpha2': 'KM',
      'alpha3': 'COM'
    }, {'name': 'Saint Kitts and Nevis', 'alpha2': 'KN', 'alpha3': 'KNA'}, {
      'name': 'Korea, Democratic People\'s Republic of',
      'alpha2': 'KP',
      'alpha3': 'PRK'
    }, {'name': 'Korea, Republic of', 'alpha2': 'KR', 'alpha3': 'KOR'}, {
      'name': 'Kuwait',
      'alpha2': 'KW',
      'alpha3': 'KWT'
    }, {'name': 'Cayman Islands', 'alpha2': 'KY', 'alpha3': 'CYM'}, {
      'name': 'Kazakhstan',
      'alpha2': 'KZ',
      'alpha3': 'KAZ'
    }, {'name': 'Lao People\'s Democratic Republic', 'alpha2': 'LA', 'alpha3': 'LAO'}, {
      'name': 'Lebanon',
      'alpha2': 'LB',
      'alpha3': 'LBN'
    }, {'name': 'Saint Lucia', 'alpha2': 'LC', 'alpha3': 'LCA'}, {
      'name': 'Liechtenstein',
      'alpha2': 'LI',
      'alpha3': 'LIE'
    }, {'name': 'Sri Lanka', 'alpha2': 'LK', 'alpha3': 'LKA'}, {'name': 'Liberia', 'alpha2': 'LR', 'alpha3': 'LBR'}, {
      'name': 'Lesotho',
      'alpha2': 'LS',
      'alpha3': 'LSO'
    }, {'name': 'Lithuania', 'alpha2': 'LT', 'alpha3': 'LTU'}, {'name': 'Luxembourg', 'alpha2': 'LU', 'alpha3': 'LUX'}, {
      'name': 'Latvia',
      'alpha2': 'LV',
      'alpha3': 'LVA'
    }, {'name': 'Libya', 'alpha2': 'LY', 'alpha3': 'LBY'}, {'name': 'Morocco', 'alpha2': 'MA', 'alpha3': 'MAR'}, {
      'name': 'Monaco',
      'alpha2': 'MC',
      'alpha3': 'MCO'
    }, {'name': 'Moldova, Republic of', 'alpha2': 'MD', 'alpha3': 'MDA'}, {
      'name': 'Montenegro',
      'alpha2': 'ME',
      'alpha3': 'MNE'
    }, {'name': 'Madagascar', 'alpha2': 'MG', 'alpha3': 'MDG'}, {
      'name': 'Marshall Islands',
      'alpha2': 'MH',
      'alpha3': 'MHL'
    }, {'name': 'Macedonia, the Former Yugoslav Republic of', 'alpha2': 'MK', 'alpha3': 'MKD'}, {
      'name': 'Mali',
      'alpha2': 'ML',
      'alpha3': 'MLI'
    }, {'name': 'Myanmar', 'alpha2': 'MM', 'alpha3': 'MMR'}, {'name': 'Mongolia', 'alpha2': 'MN', 'alpha3': 'MNG'}, {
      'name': 'Macao',
      'alpha2': 'MO',
      'alpha3': 'MAC'
    }, {'name': 'Northern Mariana Islands', 'alpha2': 'MP', 'alpha3': 'MNP'}, {
      'name': 'Martinique',
      'alpha2': 'MQ',
      'alpha3': 'MTQ'
    }, {'name': 'Mauritania', 'alpha2': 'MR', 'alpha3': 'MRT'}, {'name': 'Montserrat', 'alpha2': 'MS', 'alpha3': 'MSR'}, {
      'name': 'Malta',
      'alpha2': 'MT',
      'alpha3': 'MLT'
    }, {'name': 'Mauritius', 'alpha2': 'MU', 'alpha3': 'MUS'}, {'name': 'Maldives', 'alpha2': 'MV', 'alpha3': 'MDV'}, {
      'name': 'Malawi',
      'alpha2': 'MW',
      'alpha3': 'MWI'
    }, {'name': 'Mexico', 'alpha2': 'MX', 'alpha3': 'MEX'}, {'name': 'Malaysia', 'alpha2': 'MY', 'alpha3': 'MYS'}, {
      'name': 'Mozambique',
      'alpha2': 'MZ',
      'alpha3': 'MOZ'
    }, {'name': 'Namibia', 'alpha2': 'NA', 'alpha3': 'NAM'}, {'name': 'New Caledonia', 'alpha2': 'NC', 'alpha3': 'NCL'}, {
      'name': 'Niger',
      'alpha2': 'NE',
      'alpha3': 'NER'
    }, {'name': 'Norfolk Island', 'alpha2': 'NF', 'alpha3': 'NFK'}, {
      'name': 'Nigeria',
      'alpha2': 'NG',
      'alpha3': 'NGA'
    }, {'name': 'Nicaragua', 'alpha2': 'NI', 'alpha3': 'NIC'}, {'name': 'Netherlands', 'alpha2': 'NL', 'alpha3': 'NLD'}, {
      'name': 'Norway',
      'alpha2': 'NO',
      'alpha3': 'NOR'
    }, {'name': 'Nepal', 'alpha2': 'NP', 'alpha3': 'NPL'}, {'name': 'Nauru', 'alpha2': 'NR', 'alpha3': 'NRU'}, {
      'name': 'Niue',
      'alpha2': 'NU',
      'alpha3': 'NIU'
    }, {'name': 'New Zealand', 'alpha2': 'NZ', 'alpha3': 'NZL'}, {'name': 'Oman', 'alpha2': 'OM', 'alpha3': 'OMN'}, {
      'name': 'Panama',
      'alpha2': 'PA',
      'alpha3': 'PAN'
    }, {'name': 'Peru', 'alpha2': 'PE', 'alpha3': 'PER'}, {
      'name': 'French Polynesia',
      'alpha2': 'PF',
      'alpha3': 'PYF'
    }, {'name': 'Papua New Guinea', 'alpha2': 'PG', 'alpha3': 'PNG'}, {
      'name': 'Philippines',
      'alpha2': 'PH',
      'alpha3': 'PHL'
    }, {'name': 'Pakistan', 'alpha2': 'PK', 'alpha3': 'PAK'}, {
      'name': 'Poland',
      'alpha2': 'PL',
      'alpha3': 'POL'
    }, {'name': 'Saint Pierre and Miquelon', 'alpha2': 'PM', 'alpha3': 'SPM'}, {
      'name': 'Pitcairn',
      'alpha2': 'PN',
      'alpha3': 'PCN'
    }, {'name': 'Puerto Rico', 'alpha2': 'PR', 'alpha3': 'PRI'}, {
      'name': 'Palestine, State of',
      'alpha2': 'PS',
      'alpha3': 'PSE'
    }, {'name': 'Portugal', 'alpha2': 'PT', 'alpha3': 'PRT'}, {'name': 'Palau', 'alpha2': 'PW', 'alpha3': 'PLW'}, {
      'name': 'Paraguay',
      'alpha2': 'PY',
      'alpha3': 'PRY'
    }, {'name': 'Qatar', 'alpha2': 'QA', 'alpha3': 'QAT'}, {'name': 'Reunion', 'alpha2': 'RE', 'alpha3': 'REU'}, {
      'name': 'Romania',
      'alpha2': 'RO',
      'alpha3': 'ROU'
    }, {'name': 'Russian Federation', 'alpha2': 'RU', 'alpha3': 'RUS'}, {
      'name': 'Rwanda',
      'alpha2': 'RW',
      'alpha3': 'RWA'
    }, {'name': 'Saudi Arabia', 'alpha2': 'SA', 'alpha3': 'SAU'}, {
      'name': 'Solomon Islands',
      'alpha2': 'SB',
      'alpha3': 'SLB'
    }, {'name': 'Seychelles', 'alpha2': 'SC', 'alpha3': 'SYC'}, {'name': 'Sudan', 'alpha2': 'SD', 'alpha3': 'SDN'}, {
      'name': 'Sweden',
      'alpha2': 'SE',
      'alpha3': 'SWE'
    }, {'name': 'Singapore', 'alpha2': 'SG', 'alpha3': 'SGP'}, {
      'name': 'Saint Helena',
      'alpha2': 'SH',
      'alpha3': 'SHN'
    }, {
      'name': 'Slovenia',
      'alpha2': 'SI',
      'alpha3': 'SVN'
    }, {'name': 'Svalbard and Jan Mayen', 'alpha2': 'SJ', 'alpha3': 'SJM'}, {
      'name': 'Slovakia',
      'alpha2': 'SK',
      'alpha3': 'SVK'
    }, {'name': 'Sierra Leone', 'alpha2': 'SL', 'alpha3': 'SLE'}, {
      'name': 'San Marino',
      'alpha2': 'SM',
      'alpha3': 'SMR'
    }, {
      'name': 'Senegal',
      'alpha2': 'SN',
      'alpha3': 'SEN'
    }, {'name': 'Somalia', 'alpha2': 'SO', 'alpha3': 'SOM'}, {
      'name': 'Suriname',
      'alpha2': 'SR',
      'alpha3': 'SUR'
    }, {'name': 'Sao Tome and Principe', 'alpha2': 'ST', 'alpha3': 'STP'}, {
      'name': 'El Salvador',
      'alpha2': 'SV',
      'alpha3': 'SLV'
    }, {'name': 'Syrian Arab Republic', 'alpha2': 'SY', 'alpha3': 'SYR'}, {
      'name': 'Swaziland',
      'alpha2': 'SZ',
      'alpha3': 'SWZ'
    }, {'name': 'Turks and Caicos Islands', 'alpha2': 'TC', 'alpha3': 'TCA'}, {
      'name': 'Chad',
      'alpha2': 'TD',
      'alpha3': 'TCD'
    }, {'name': 'French Southern Territories', 'alpha2': 'TF', 'alpha3': 'ATF'}, {
      'name': 'Togo',
      'alpha2': 'TG',
      'alpha3': 'TGO'
    }, {'name': 'Thailand', 'alpha2': 'TH', 'alpha3': 'THA'}, {'name': 'Tajikistan', 'alpha2': 'TJ', 'alpha3': 'TJK'}, {
      'name': 'Tokelau',
      'alpha2': 'TK',
      'alpha3': 'TKL'
    }, {'name': 'Timor-Leste', 'alpha2': 'TL', 'alpha3': 'TLS'}, {
      'name': 'Turkmenistan',
      'alpha2': 'TM',
      'alpha3': 'TKM'
    }, {'name': 'Tunisia', 'alpha2': 'TN', 'alpha3': 'TUN'}, {'name': 'Tonga', 'alpha2': 'TO', 'alpha3': 'TON'}, {
      'name': 'Turkey',
      'alpha2': 'TR',
      'alpha3': 'TUR'
    }, {'name': 'Trinidad and Tobago', 'alpha2': 'TT', 'alpha3': 'TTO'}, {
      'name': 'Tuvalu',
      'alpha2': 'TV',
      'alpha3': 'TUV'
    }, {'name': 'Taiwan, Province of China', 'alpha2': 'TW', 'alpha3': 'TWN'}, {
      'name': 'United Republic of Tanzania',
      'alpha2': 'TZ',
      'alpha3': 'TZA'
    }, {'name': 'Ukraine', 'alpha2': 'UA', 'alpha3': 'UKR'}, {
      'name': 'Uganda',
      'alpha2': 'UG',
      'alpha3': 'UGA'
    }, {'name': 'United States Minor Outlying Islands', 'alpha2': 'UM', 'alpha3': 'UMI'}, {
      'name': 'United States of America',
      'alpha2': 'US',
      'alpha3': 'USA'
    }, {'name': 'Uruguay', 'alpha2': 'UY', 'alpha3': 'URY'}, {
      'name': 'Uzbekistan',
      'alpha2': 'UZ',
      'alpha3': 'UZB'
    }, {'name': 'Holy See (Vatican City State)', 'alpha2': 'VA', 'alpha3': 'VAT'}, {
      'name': 'Saint Vincent and the Grenadines',
      'alpha2': 'VC',
      'alpha3': 'VCT'
    }, {'name': 'Venezuela', 'alpha2': 'VE', 'alpha3': 'VEN'}, {
      'name': 'British Virgin Islands',
      'alpha2': 'VG',
      'alpha3': 'VGB'
    }, {'name': 'US Virgin Islands', 'alpha2': 'VI', 'alpha3': 'VIR'}, {
      'name': 'Viet Nam',
      'alpha2': 'VN',
      'alpha3': 'VNM'
    }, {'name': 'Vanuatu', 'alpha2': 'VU', 'alpha3': 'VUT'}, {
      'name': 'Wallis and Futuna',
      'alpha2': 'WF',
      'alpha3': 'WLF'
    }, {
      'name': 'Samoa',
      'alpha2': 'WS',
      'alpha3': 'WSM'
    }, {'name': 'Yemen', 'alpha2': 'YE', 'alpha3': 'YEM'}, {'name': 'Mayotte', 'alpha2': 'YT', 'alpha3': 'MYT'}, {
      'name': 'South Africa',
      'alpha2': 'ZA',
      'alpha3': 'ZAF'
    }, {'name': 'Zambia', 'alpha2': 'ZM', 'alpha3': 'ZMB'}, {'name': 'Zimbabwe', 'alpha2': 'ZW', 'alpha3': 'ZWE'}]
  }
;
