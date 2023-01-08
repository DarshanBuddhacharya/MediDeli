import { useState } from "react"
import { useAppSelector } from "../src/features/hooks"
import { useLatLng } from "../utils/useLatLng"

import { REACT_APP_MAPBOX_KEY } from "@env"

export const ACCOUNT_SETTINGS = [
    {
        iconName: "key-variant",
        List: "Change Password",
        link: "Home",
        iconColor:
            "#F8961E",
    },
    {
        iconName: "account-outline",
        List: "Advanced Settings",
        link: "Home",
        iconColor:
            "#FA6163",
    },
]

export const ACCOUNT_COMPELETE_SETTINGS = () => {
    const accountData = useAppSelector(state => state.account.account)

    const { latitude, longitude } = useLatLng(accountData?.address ?? '');



    var apiKey = REACT_APP_MAPBOX_KEY;
    var apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=' + apiKey;


    const [address, setAddress] = useState()
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(async function (data) {
            var address = await data.features[0].place_name;
            setAddress(address)
        }).catch(e => console.log(e));


    return [
        {
            iconName: "navigation-outline",
            List: "Primary Delivery Location",
            link: "Home",
            secondaryText: address,
            iconColor:
                "#ED070B",
        },
        {
            iconName: "navigation-variant-outline",
            List: "Secondary Delivery Location",
            link: "Home",
            iconColor:
                "#147DF5",
        },
        {
            iconName: "account-box-multiple-outline",
            List: "KYC Verification",
            link: "Home",
            iconColor:
                "#580AFF",
        },
    ]
}

export const PAYMENT_SETTINGS = [
    {
        iconName: "credit-card-outline",
        List: "Payment methods",
        link: "Home",
        iconColor:
            "#1DBCED",
    },
    {
        iconName: "file-document-multiple-outline",
        List: "Payment History",
        link: "Home",
        iconColor:
            "#7EB356",
    },
]

export const APP_SETTINGS = [
    {
        iconName: "file-document-outline",
        List: "Terms and Conditions",
        link: "Home",
        iconColor:
            "#69A4B5",
    },
    {
        iconName: "bell-ring-outline",
        List: "Notification",
        link: "Home",
        iconColor:
            "#FF8700",
    },
    {
        iconName: "white-balance-sunny",
        List: "Toggle Light/Dark Mode",
        link: "Home",
        iconColor:
            "#335C67",
    },
    {
        iconName: "message-alert-outline",
        List: "FeedBack",
        link: "Home",
        iconColor:
            "#588F00",
    },
    {
        iconName: "exclamation-thick",
        List: "Report",
        link: "Home",
        iconColor:
            "#ED070B",
    },
    {
        iconName: "information-outline",
        List: "App Info",
        link: "Home",
        iconColor:
            "#147DF5",
    },
]