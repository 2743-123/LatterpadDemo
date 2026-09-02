import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const PIN = "274327";

export default function App() {
  // =====================================================
  // PIN
  // =====================================================

  const [enteredPin, setEnteredPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // =====================================================
  // COMMON INFORMATION
  // =====================================================

  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [mobile, setMobile] = useState("");

  const [address, setAddress] = useState(
    "AT POST : NANI NAROLI, TA : MANGROL, DIST : SURAT – 394110"
  );

  // =====================================================
  // 1. ENABLE DETAILS
  // =====================================================

  const [extraEnabled, setExtraEnabled] = useState(false);

  const [flyash, setFlyash] = useState("");
  const [bedash, setBedash] = useState("");
  const [manualDate, setManualDate] = useState("");

  const [imageBase64, setImageBase64] =
    useState<string | null>(null);

  const [previewUri, setPreviewUri] =
    useState<string | null>(null);

  // =====================================================
  // 2. BAHEDHARI
  // =====================================================

  const [bahedhariEnabled, setBahedhariEnabled] =
    useState(false);

  const [bahedhariName, setBahedhariName] =
    useState("");

  const [bahedhariDate, setBahedhariDate] =
    useState("");

  // =====================================================
  // 3. SAMMATI PATRA
  // =====================================================

  const [sammatiEnabled, setSammatiEnabled] =
    useState(false);

  const [ownerName, setOwnerName] =
    useState("");

  const [rentOwnerName, setRentOwnerName] =
    useState("");

  const [ownerNumber, setOwnerNumber] =
    useState("");

  const [sammatiDate, setSammatiDate] =
    useState("");

  // =====================================================
  // 4. KYC
  // =====================================================

  const [kycEnabled, setKycEnabled] =
    useState(false);

  const [kycOwnerName, setKycOwnerName] =
    useState("");

  const [gstNo, setGstNo] =
    useState("");

  const [panNo, setPanNo] =
    useState("");

  const [bankAcNo, setBankAcNo] =
    useState("");

  const [ifscCode, setIfscCode] =
    useState("");

  const [kycDate, setKycDate] =
    useState("");

  // =====================================================
  // FIXED DATE
  // =====================================================

  const fixedDate = "____ / ____ / 20__";

  // =====================================================
  // PIN CHECK
  // =====================================================

  const checkPin = () => {
    if (enteredPin === PIN) {
      setUnlocked(true);
    } else {
      Alert.alert("Wrong PIN");
    }
  };

  // =====================================================
  // IMAGE PICKER
  // =====================================================

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 0.7,
      });

    if (
      !result.canceled &&
      result.assets.length > 0
    ) {
      setPreviewUri(result.assets[0].uri);

      setImageBase64(
        result.assets[0].base64 || null
      );
    }
  };

  // =====================================================
  // CLEAN DATA
  // =====================================================

  const upperName =
    name.toUpperCase();

  const upperParty =
    party.toUpperCase();

  const cleanMobile =
    mobile.replace(/[^0-9]/g, "");

  const upperAddress =
    address.toUpperCase();

  // Dynamic font size based on text length
  const getFontSize = (text: string) => {
    if (text.length > 22) return 30;
    if (text.length > 14) return 38;
    return 45;
  };

  const getBaseFont = (text: string) => {
    if (text.length > 25) return 16;
    return 18;
  };

  const upperBahedhariName =
    bahedhariName.toUpperCase();

  const upperOwnerName =
    ownerName.toUpperCase();

  const upperRentOwnerName =
    rentOwnerName.toUpperCase();

  const cleanOwnerNumber =
    ownerNumber.replace(/[^0-9]/g, "");

  // =====================================================
  // KYC DATA
  // =====================================================

  const upperKycOwnerName =
    kycOwnerName.toUpperCase();

  const upperGstNo =
    gstNo.toUpperCase();

  const upperPanNo =
    panNo.toUpperCase();

  const cleanBankAcNo =
    bankAcNo.replace(/[^0-9]/g, "");

  const upperIfscCode =
    ifscCode.toUpperCase();

  // =====================================================
  // NORMAL TOTAL
  // =====================================================

  const total =
    flyash && bedash
      ? Number(flyash) + Number(bedash)
      : "";

  const dateToPrint =
    extraEnabled && manualDate
      ? manualDate
      : fixedDate;

  // =====================================================
  // NORMAL VALUE BLOCK
  // =====================================================

  const valueBlock =
    extraEnabled
      ? `
        <div
          style="
            text-align:right;
            font-weight:bold;
            line-height:1.1;
          "
        >

          ${flyash
        ? `ફ્લાયશ = ${flyash}<br/>`
        : ""
      }

          ${bedash
        ? `બેડશ = ${bedash}<br/>`
        : ""
      }

          ${flyash && bedash
        ? `
                <div
                  style="
                    border-top:1.5px solid #000;
                    width:90px;
                    margin:1px 0 0 auto;
                  "
                ></div>

                <div style="margin-top:1px;">
                  કુલ = ${total}
                </div>
              `
        : ""
      }

        </div>
      `
      : "";

  const flyashMark =
    extraEnabled
      ? flyash
        ? "✔"
        : "✖"
      : "&nbsp;";

  const bedashMark =
    extraEnabled
      ? bedash
        ? "✔"
        : "✖"
      : "&nbsp;";

  // =====================================================
  // NORMAL PDF
  // =====================================================

  const createNormalPDF = async () => {
    const imageHtml =
      extraEnabled && imageBase64
        ? `
          <img
            src="data:image/jpeg;base64,${imageBase64}"
            style="
              width:100%;
              height:100%;
              object-fit:contain;
            "
          />
        `
        : "";

    const html = `
      <html>

      <head>

        <meta charset="UTF-8">

        <style>

          @page {
            size: A4 landscape;
            margin: 10mm;
          }

          body {
            font-family: Arial;
            font-size: 18px;
          }

          .row {
            display:flex;
            justify-content:space-between;
            height:95%;
          }

          .slip {
            width:48%;
            height:100%;
            border:1px solid #000;
            padding:12px;
            box-sizing:border-box;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
          }

          .box {
            width:50px;
            height:18px;
            border:1px solid #000;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            font-weight:bold;
            flex-shrink:0;
          }

          p {
            margin:0;
            line-height:1;
          }

        </style>

      </head>

      <body>

        <div class="row">

          ${[1, 2]
        .map((_, index) => {

          if (
            extraEnabled &&
            index === 1 &&
            imageBase64
          ) {
            return `
                  <div
                    class="slip"
                    style="
                      display:flex;
                      align-items:center;
                      justify-content:center;
                    "
                  >
                    ${imageHtml}
                  </div>
                `;
          }

          return `
                <div class="slip">

                  <p>
                    <b>
                      Mo No – ${cleanMobile}
                    </b>
                  </p>

                  <div
                    style="
                      text-align:center;
                      font-size:${getFontSize(upperName)}px;
                      font-weight:bold;
                      line-height:1;
                      margin:0;
                      padding:0;
                    "
                  >
                    ${upperName}
                  </div>

                  <div
                    style="
                      position:relative;
                      text-align:center;
                      font-size:${getBaseFont(upperAddress)}px;
                      font-weight:bold;
                      line-height:1;
                      margin-top:0;
                      padding:0 0 5px 0;
                    "
                  >
                    ${upperAddress}

                    <div
                      style="
                        position:absolute;
                        left:0;
                        right:0;
                        bottom:0;
                        border-top:2px solid #000;
                      "
                    ></div>
                  </div>

                  <div
                    style="
                      display:flex;
                      justify-content:space-between;
                    "
                  >

                    <span>
                      <b>PARTY CODE :</b>
                      ${upperParty}
                    </span>

                    <span>
                      <b>DATE :</b>
                      ${dateToPrint}
                    </span>

                  </div>

                  <div
                    style="
                      display:flex;
                      justify-content:space-between;
                      align-items:flex-start;
                    "
                  >

                    <p>
                      ભઠ્ઠા નું નામ :
                      ${upperName}
                    </p>

                    ${valueBlock}

                  </div>

                  <p>
                    ટ્રક નંબર :
                  </p>

                  <p>
                    મોબાઇલ નંબર :
                    ${cleanMobile}
                  </p>

                  <p>

                    માલ ની જરૂરિયાત :

                    <span
                      style="
                        display:inline-block;
                        text-align:center;
                        margin-left:10px;
                        white-space:nowrap;
                      "
                    >

                      <span class="box">
                        ${flyashMark}
                      </span>

                      ફ્લાયશ

                    </span>

                    <span
                      style="
                        display:inline-block;
                        text-align:center;
                        margin-left:25px;
                        white-space:nowrap;
                      "
                    >

                      <span class="box">
                        ${bedashMark}
                      </span>

                      બેડશ

                    </span>

                  </p>

                  <p>
                    માલ ખાલી કરવાની જગ્યા :
                  </p>

                  <p>
                    માલ નો ઉપયોગ :
                    ભઠ્ઠા પર ઈંટ બનાવવા માટે
                  </p>

                </div>
              `;
        })
        .join("")}

        </div>

      </body>

      </html>
    `;

    const { uri } =
      await Print.printToFileAsync({
        html,
        width: 842,
        height: 595,
      });

    await Sharing.shareAsync(uri);
  };

  // =====================================================
  // BAHEDHARI PDF
  // =====================================================

  const createBahedhariPDF = async () => {

    if (!bahedhariName.trim()) {
      Alert.alert(
        "બાહેધરીનું નામ નાખો"
      );
      return;
    }

    const finalDate =
      bahedhariDate.trim()
        ? bahedhariDate
        : fixedDate;

    const html = `
      <html>

      <head>

        <meta charset="UTF-8">

        <style>

          @page {
            size:A4 portrait;
            margin:15mm;
          }

          body {
            font-family:Arial,sans-serif;
            color:#000;
            margin:0;
            padding:0;
            font-size:17px;
          }

          .mobile {
            text-align:right;
            font-weight:bold;
            font-size:15px;
          }

          .title {
            text-align:center;
            font-size:38px;
            font-weight:bold;
            margin-top:5px;
          }

          .address {
            text-align:center;
            font-size:15px;
            margin-top:5px;
            padding-bottom:10px;
            border-bottom:1.5px solid #000;
          }

          .info {
            display:flex;
            justify-content:space-between;
            font-weight:bold;
            font-size:15px;
            margin-top:18px;
          }

          .letter {
            margin-top:15px;
            line-height:1.65;
          }

          .heading {
            text-align:center;
            font-size:24px;
            font-weight:bold;
            margin-top:35px;
            margin-bottom:35px;
          }

          .paragraph {
            font-size:17px;
            line-height:2;
          }

          .signature {
            margin-top:145px;
            text-align:right;
            font-weight:bold;
          }

          .cooperation {
            text-align:right;
            margin-top:12px;
          }

        </style>

      </head>

      <body>

        <div class="mobile">
          મો નં: ${cleanMobile}
        </div>

        <div class="title">
          ${upperName}
        </div>

        <div class="address">
          ${upperAddress}
        </div>

        <div class="info">

          <span>
            PARTY CODE : ${upperParty}
          </span>

          <span>
            DATE : ${finalDate}
          </span>

        </div>

        <div class="letter">

          <div>પ્રતિ</div>
          <div>મેનેજર સાહેબ</div>
          <div>AHS ડિપાર્ટમેન્ટ</div>
          <div>GIPCL</div>
          <div>નાની નરોલી</div>

        </div>

        <div class="heading">
          બાહેંધરી / ખાતરી
        </div>

        <div class="paragraph">

          હું
          <b>${upperBahedhariName}</b>
          GIPCL કંપની ને નીચે મુજબ
          બાહેંધરી / ખાતરી આપું છું.

          <br/><br/>

          ઉપરોક્ત પાર્ટી કોડ પર થી જે FLY ASH / BED ASH
          અમારા દ્વારા GIPCL કંપની માંથી
          લઈ જવામાં આવશે તેનો ઉપયોગ
          અમારા પોતાના ભઠ્ઠા માટે ઈંટ
          બનાવવા માટે કરવામાં આવશે.

          <br/><br/>

          જો આ FLY ASH / BED ASH નો બીજો
          કોઈ પણ હેતુ માટે ઉપયોગ કરવામાં
          આવશે તો ઉપર દર્શાવેલ પાર્ટી કોડ
          કંપની રદ કરી શકશે.

        </div>

        <div class="signature">
          ${upperBahedhariName}
        </div>

        <div class="cooperation">
          સહકારની અપેક્ષા
        </div>

      </body>

      </html>
    `;

    const { uri } =
      await Print.printToFileAsync({
        html,
        width: 595,
        height: 842,
      });

    await Sharing.shareAsync(uri);
  };

  // =====================================================
  // SAMMATI PATRA PDF
  // =====================================================

  const createSammatiPDF = async () => {

    if (!ownerName.trim()) {
      Alert.alert(
        "Owner Name નાખો"
      );
      return;
    }

    if (!rentOwnerName.trim()) {
      Alert.alert(
        "Rent Owner Name નાખો"
      );
      return;
    }

    if (!cleanOwnerNumber) {
      Alert.alert(
        "Owner Number નાખો"
      );
      return;
    }

    const finalDate =
      sammatiDate.trim()
        ? sammatiDate
        : fixedDate;

    const html = `
      <html>

      <head>

        <meta charset="UTF-8">

        <style>

          @page {
            size:A4 portrait;
            margin:14mm;
          }

          body {
            font-family:Arial,sans-serif;
            color:#000;
            margin:0;
            padding:0;
            font-size:17px;
          }

          .topRow {
            display:flex;
            justify-content:space-between;
            font-weight:bold;
            font-size:15px;
          }

          .title {
            text-align:center;
            font-size:38px;
            font-weight:bold;
            margin-top:3px;
          }


          .address {
            text-align:center;
            font-size:15px;
            font-weight:bold;
            margin-top:5px;
            padding-bottom:10px;
            border-bottom:1.5px solid #000;
          }

          .infoRow {
            display:flex;
            justify-content:space-between;
            font-weight:bold;
            font-size:18px;
            margin-top:17px;
          }

          .receiver {
            margin-top:55px;
            line-height:1.7;
          }

          .subject {
            text-align:center;
            font-size:22px;
            font-weight:bold;
            margin-top:50px;
            margin-bottom:55px;
          }

          .bodyText {
            font-size:18px;
            line-height:2.1;
          }

          .signature {
            margin-top:160px;
            text-align:right;
            font-weight:bold;
          }

          .cooperation {
            text-align:right;
            margin-top:12px;
          }

        </style>

      </head>

      <body>

        <div class="topRow">

          <span>
            Owner No : ${cleanOwnerNumber}
          </span>

          <span>
            મો નં: ${cleanMobile}
          </span>

        </div>

        <div class="title">
          ${upperName}
        </div>

        <div class="address">
          ${upperAddress}
        </div>

        <div class="infoRow">

          <span>
            PARTY CODE : ${upperParty}
          </span>

          <span>
            DATE : ${finalDate}
          </span>

        </div>

        <div class="receiver">

          <div>પ્રતિ</div>
          <div>મેનેજર સાહેબ</div>
          <div>AHS ડિપાર્ટમેન્ટ</div>
          <div>GIPCL</div>
          <div>નાની નરોલી</div>

        </div>

        <div class="subject">
          વિષય: કોટા સંમતિ બાબત
        </div>

        <div class="bodyText">

          જય ભારત સહ,

          <br/><br/>

          ઉપરોક્ત વિષય ના અનુસંધાન માં
          જણાવવાનું કે હું
          <b>${upperOwnerName}</b>
          <b>${upperName}</b> ના નામ થી
          કોટા ધરાવું છું.

          હવે થી આ કોટા માં ફુલટાઈમ
          FLY ASH / BED ASH ની લેવડ દેવડ ની
          સંમતિ
          <b>${upperRentOwnerName}</b>
          ને આપું છું.

        </div>

        <div class="signature">
          ${upperOwnerName}
        </div>

        <div class="cooperation">
          સહકારની અપેક્ષા
        </div>

      </body>

      </html>
    `;

    const { uri } =
      await Print.printToFileAsync({
        html,
        width: 595,
        height: 842,
      });

    await Sharing.shareAsync(uri);
  };

  // =====================================================
  // KYC PDF
  // =====================================================

  const createKycPDF = async () => {

    if (!kycOwnerName.trim()) {
      Alert.alert(
        "Owner Name નાખો"
      );
      return;
    }

    if (!gstNo.trim()) {
      Alert.alert(
        "GST No નાખો"
      );
      return;
    }

    if (!panNo.trim()) {
      Alert.alert(
        "PAN Card No નાખો"
      );
      return;
    }

    if (!bankAcNo.trim()) {
      Alert.alert(
        "Bank A/C No નાખો"
      );
      return;
    }

    if (!ifscCode.trim()) {
      Alert.alert(
        "IFSC Code નાખો"
      );
      return;
    }
    const finalKycDate =
      kycDate.trim()
        ? kycDate
        : "____ / ____ / 20__";

    const html = `
      <html>

      <head>

        <meta charset="UTF-8">

        <style>

          @page {
            size:A4 portrait;
            margin:11mm 13mm 10mm 13mm;
          }

          body {
            font-family:Arial,sans-serif;
            color:#000;
            margin:0;
            padding:0;
            font-size:18px;
          }

          .topMobile {
            text-align:right;
            font-size:20px;
            font-weight:bold;
            margin-bottom:1px;
          }

          .mainTitle {
            text-align:center;
            font-size:40px;
            font-weight:bold;
            margin:0;
            line-height:1.05;
          }

          .address {
            text-align:center;
            font-size:20px;
            font-weight:bold;
            margin-top:3px;
            padding-bottom:7px;
            border-bottom:1.5px solid #000;
          }

          .partyDate {
          display: flex;
          justify-content: space-between;
          align-items: center;

          font-family: Arial, sans-serif;
          font-size: 20px;
          font-weight: bold;

          margin-top: 4mm;
        }

          .receiver {
            margin-top:10px;
            line-height:1.45;
            font-size:20px;
          }

          .subject {
            text-align:center;
            font-size:19px;
            font-weight:bold;
            margin-top:17px;
            margin-bottom:13px;
          }

          .intro {
            font-size:20px;
            line-height:1.55;
            text-align:justify;
          }

          .details {
            margin-top:8px;
            margin-left:16px;
            font-size:20px;
            line-height:1.48;
          }

          .detailRow {
            margin-bottom:2px;
          }

          .signature {
            text-align:right;
            font-size:20px;
            font-weight:bold;
            margin-top:10px;
            margin-right:35px;
          }

          .cooperation {
            text-align:right;
            font-size:18px;
            font-weight:bold;
            margin-top:12px;
            margin-right:40px;
          }

        </style>

      </head>

      <body>

        <!-- TOP MOBILE -->

        <div class="topMobile">
          મો નં: ${cleanMobile}
        </div>

        <!-- BHATHA NAME -->

        <div class="mainTitle">
          ${upperName}
        </div>

        <!-- ADDRESS -->

        <div class="address">
          ${upperAddress}
        </div>

        <!-- PARTY + DATE -->

        <div class="partyDate">

          <span>
            PARTY CODE : ${upperParty}
          </span>

          <span>
            DATE : ${finalKycDate}
          </span>

        </div>

        <!-- RECEIVER -->
        <br/>

        <div class="receiver">

          <div>પ્રતિ</div>
          <div>મેનેજર સાહેબ</div>
          <div>AHS ડિપાર્ટમેન્ટ</div>
          <div>GIPCL</div>
          <div>નાની નરોલી</div>

        </div>

        <!-- SUBJECT -->
        <br/>

        <div class="subject">
      

          વિષય: ${upperParty}
          ${upperName}
          નું K.Y.C માટે ની દરખાસ્ત
          તેમજ ડોક્યુમેન્ટ આપવા બાબત.

        </div>

        <!-- INTRODUCTION -->

        <div class="intro">

          જય ભારત સહ,

          <br/>

          ઉપરોક્ત વિષય ના અનુસંધાન માં જણાવવાનું
          કે મારો ફ્લાયએશ તેમજ બેડએશ નું પાર્ટી કોડ
          <b>${upperParty}</b>
          ${upperName} ના નામ નું પાર્ટી કોડ ધરાવું છું
          અને હાલ માં પણ ચાલુ છે.
          જરૂરી માહિતી નીચે મુજબ છે.

        </div>

        <!-- DETAILS -->
        <br/>

        <div class="details">

          <div class="detailRow">
            1. કંપની/ભઠ્ઠા નું નામ :
            <b>${upperName}</b>
          </div>

          <div class="detailRow">
            2. માલિક નું નામ :
            <b>${upperKycOwnerName}</b>
          </div>

          <div class="detailRow">
            3. ભઠ્ઠા નું નામ :
            <b>${upperName}</b>
          </div>

          <div class="detailRow">
            4. સરનામું :
            ${upperAddress}
          </div>

          <div class="detailRow">
            5. પાર્ટી કોડ :
            <b>${upperParty}</b>
          </div>

          <div class="detailRow">
            6. રજિસ્ટર્ડ મોબાઇલ નંબર :
            <b>${cleanMobile}</b>
          </div>

          <div class="detailRow">
            7. EMAIL ADDRESS :
            નથી
          </div>

          <div class="detailRow">
            8. GST NO :
            <b>${upperGstNo}</b>
          </div>

          <div class="detailRow">
            9. પાન કાર્ડ નંબર :
            <b>${upperPanNo}</b>
          </div>

          <div class="detailRow">
            10. BANK AC/NO :
            <b>${cleanBankAcNo}</b>
            &nbsp;&nbsp;
            IFSC CODE :
            <b>${upperIfscCode}</b>
          </div>

        </div>

        <!-- SIGNATURE -->
        <br/>
        <br/>
        <br/>

        <div class="signature">
          ${upperKycOwnerName}
        </div>

        <!-- COOPERATION -->

        <div class="cooperation">
          સહકાર ની અપેક્ષા
        </div>

      </body>

      </html>
    `;

    const { uri } =
      await Print.printToFileAsync({
        html,
        width: 595,
        height: 842,
      });

    await Sharing.shareAsync(uri);
  };

  // =====================================================
  // MAIN PDF ROUTER
  // =====================================================

  const createPDF = async () => {

    try {

      if (kycEnabled) {
        await createKycPDF();
        return;
      }

      if (sammatiEnabled) {
        await createSammatiPDF();
        return;
      }

      if (bahedhariEnabled) {
        await createBahedhariPDF();
        return;
      }

      await createNormalPDF();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "PDF Error",
        "PDF બનાવવામાં સમસ્યા આવી."
      );

    }
  };

  // =====================================================
  // PIN SCREEN
  // =====================================================

  if (!unlocked) {

    return (

      <View style={styles.container}>

        <Text style={styles.devText}>
          Asif Shabbir Andhi — Developed By
        </Text>

        <Text style={styles.title}>
          Enter PIN
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          secureTextEntry
          value={enteredPin}
          onChangeText={setEnteredPin}
          placeholder="Enter PIN"
        />

        <Button
          title="Unlock"
          onPress={checkPin}
        />

      </View>

    );
  }

  // =====================================================
  // MAIN APP
  // =====================================================

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

      {/* =================================================
          COMMON FIELDS
      ================================================= */}

      <Text style={styles.sectionTitle}>
        Common Details
      </Text>

      <TextInput
        placeholder="Bhatha Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Party Code"
        style={styles.input}
        value={party}
        onChangeText={setParty}
      />

      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      {/* =================================================
          MODE 1 - NORMAL DETAILS
      ================================================= */}

      {!bahedhariEnabled &&
        !sammatiEnabled &&
        !kycEnabled && (

          <View style={styles.enableCard}>

            <View style={styles.switchRow}>

              <Text style={styles.enableTitle}>
                Enable Details
              </Text>

              <Switch
                value={extraEnabled}
                onValueChange={(value) => {

                  setExtraEnabled(value);

                  if (value) {

                    setBahedhariEnabled(false);
                    setSammatiEnabled(false);
                    setKycEnabled(false);

                  }

                }}
              />

            </View>

          </View>

        )}

      {/* =================================================
          NORMAL DETAIL FIELDS
      ================================================= */}

      {extraEnabled && (

        <>

          <TextInput
            placeholder="Enter Date"
            style={styles.input}
            value={manualDate}
            onChangeText={setManualDate}
          />

          <Button
            title="Upload Image"
            onPress={pickImage}
          />

          {previewUri && (

            <Image
              source={{ uri: previewUri }}
              style={styles.preview}
            />

          )}

          <TextInput
            placeholder="ફ્લાયશ"
            style={styles.input}
            keyboardType="numeric"
            value={flyash}
            onChangeText={setFlyash}
          />

          <TextInput
            placeholder="બેડશ"
            style={styles.input}
            keyboardType="numeric"
            value={bedash}
            onChangeText={setBedash}
          />

        </>

      )}

      {/* =================================================
          MODE 2 - BAHEDHARI
      ================================================= */}

      {!extraEnabled &&
        !sammatiEnabled &&
        !kycEnabled && (

          <View style={styles.enableCard}>

            <View style={styles.switchRow}>

              <Text style={styles.enableTitle}>
                બાહેધરી Enable
              </Text>

              <Switch
                value={bahedhariEnabled}
                onValueChange={(value) => {

                  setBahedhariEnabled(value);

                  if (value) {

                    setExtraEnabled(false);
                    setSammatiEnabled(false);
                    setKycEnabled(false);

                  }

                }}
              />

            </View>

          </View>

        )}

      {/* =================================================
          BAHEDHARI FIELDS
      ================================================= */}

      {bahedhariEnabled && (

        <>

          <TextInput
            placeholder="બાહેધરીનું નામ"
            style={styles.input}
            value={bahedhariName}
            onChangeText={setBahedhariName}
          />

          <TextInput
            placeholder="Date"
            style={styles.input}
            value={bahedhariDate}
            onChangeText={setBahedhariDate}
          />

        </>

      )}

      {/* =================================================
          MODE 3 - SAMMATI
      ================================================= */}

      {!extraEnabled &&
        !bahedhariEnabled &&
        !kycEnabled && (

          <View style={styles.enableCard}>

            <View style={styles.switchRow}>

              <Text style={styles.enableTitle}>
                સંમતિ પત્ર Enable
              </Text>

              <Switch
                value={sammatiEnabled}
                onValueChange={(value) => {

                  setSammatiEnabled(value);

                  if (value) {

                    setExtraEnabled(false);
                    setBahedhariEnabled(false);
                    setKycEnabled(false);

                  }

                }}
              />

            </View>

          </View>

        )}

      {/* =================================================
          SAMMATI FIELDS
      ================================================= */}

      {sammatiEnabled && (

        <>

          <TextInput
            placeholder="Owner Name"
            style={styles.input}
            value={ownerName}
            onChangeText={setOwnerName}
          />

          <TextInput
            placeholder="Rent Owner Name"
            style={styles.input}
            value={rentOwnerName}
            onChangeText={setRentOwnerName}
          />

          <TextInput
            placeholder="Owner Number"
            style={styles.input}
            value={ownerNumber}
            onChangeText={setOwnerNumber}
            keyboardType="phone-pad"
          />

          <TextInput
            placeholder="Date"
            style={styles.input}
            value={sammatiDate}
            onChangeText={setSammatiDate}
          />

        </>

      )}

      {/* =================================================
          MODE 4 - KYC
      ================================================= */}

      {!extraEnabled &&
        !bahedhariEnabled &&
        !sammatiEnabled && (

          <View style={styles.enableCard}>

            <View style={styles.switchRow}>

              <Text style={styles.enableTitle}>
                KYC Enable
              </Text>

              <Switch
                value={kycEnabled}
                onValueChange={(value) => {

                  setKycEnabled(value);

                  if (value) {

                    setExtraEnabled(false);
                    setBahedhariEnabled(false);
                    setSammatiEnabled(false);

                  }

                }}
              />

            </View>

          </View>

        )}

      {/* =================================================
          KYC FIELDS
      ================================================= */}

      {kycEnabled && (

        <View>

          <Text style={styles.sectionTitle}>
            KYC Details
          </Text>

          {/* OWNER NAME */}

          <TextInput
            placeholder="Owner Name"
            style={styles.input}
            value={kycOwnerName}
            onChangeText={setKycOwnerName}
          />

          {/* GST */}

          <TextInput
            placeholder="GST No"
            style={styles.input}
            value={gstNo}
            onChangeText={setGstNo}
            autoCapitalize="characters"
          />

          {/* PAN */}

          <TextInput
            placeholder="PAN Card No"
            style={styles.input}
            value={panNo}
            onChangeText={setPanNo}
            autoCapitalize="characters"
          />

          {/* BANK ACCOUNT */}

          <TextInput
            placeholder="Bank A/C No"
            style={styles.input}
            value={bankAcNo}
            onChangeText={setBankAcNo}
            keyboardType="numeric"
          />

          {/* IFSC */}

          <TextInput
            placeholder="IFSC Code"
            style={styles.input}
            value={ifscCode}
            onChangeText={setIfscCode}
            autoCapitalize="characters"
          />
          <TextInput
            placeholder="KYC Date"
            style={styles.input}
            value={kycDate}
            onChangeText={setKycDate}
          />

        </View>

      )}

      {/* =================================================
          GENERATE BUTTON
      ================================================= */}

      <View style={styles.generateButton}>

        <Button
          title={
            kycEnabled
              ? "Generate KYC PDF"
              : sammatiEnabled
                ? "Generate સંમતિ પત્ર PDF"
                : bahedhariEnabled
                  ? "Generate બાહેધરી PDF"
                  : "Generate PDF"
          }
          onPress={createPDF}
        />

      </View>

    </ScrollView>

  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {

    flexGrow: 1,

    justifyContent: "center",

    padding: 20,

  },

  title: {

    fontSize: 22,

    textAlign: "center",

    marginBottom: 10,

  },

  devText: {

    textAlign: "center",

    fontSize: 14,

    marginBottom: 10,

    fontWeight: "600",

  },

  sectionTitle: {

    fontSize: 18,

    fontWeight: "bold",

    marginTop: 10,

    marginBottom: 10,

  },

  input: {

    borderWidth: 1,

    marginBottom: 10,

    padding: 10,

    borderRadius: 5,

    backgroundColor: "#fff",

  },

  enableCard: {

    borderWidth: 1,

    borderRadius: 6,

    paddingHorizontal: 10,

    marginTop: 10,

    marginBottom: 5,

  },

  switchRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginVertical: 10,

  },

  enableTitle: {

    fontSize: 17,

    fontWeight: "bold",

  },

  preview: {

    width: 120,

    height: 120,

    alignSelf: "center",

    marginVertical: 10,

  },

  generateButton: {

    marginTop: 15,

    marginBottom: 40,

  },

});