/**
* How to use this script
*
* Every ws should include the following:
* - 1 x title element with the id:     'ws-heading'    This will be the title of the document.
* - 1 x body element with the id:      'ws-body'     This will consist of one or multiple p elements.
* - 1 x textarea with the id:          'ws-textarea'     This will the user input.
* - 1 x save button with the id:       'ws-save-btn'
* */

// User details
const userName = $("#fedora-data").data("name");

// document elements
const wsContainer = document.getElementById("ws-container");
const wsHeading = document.getElementById("ws-heading");
const wsBody = document.getElementById("ws-body");
const courseTitleTxt = $("#courseSidebar").find("h2")[0].innerText;
const wsUserText = () => document.getElementById("ws-textarea").value;

// PDF metadata
const date = () => new Date().toLocaleDateString();
const timeStamp = () => new Date().toLocaleString("en-GB");
const fileName = () =>
 [wsHeading.innerText, document.title, date()].join("_");

//PDF layout
const pageMargins = [55, 75, 55, 55];

//PDF Images
const images = {
 logo: "https://cdn.fs.teachablecdn.com/9PZax5nDTMCk2FswqnCx",
};

// PDF Header and Footer
const header = {
 columns: [
   {
     text: courseTitleTxt,
     alignment: "left",
     fontSize: 8,
     color: "darkgrey",
     italics: true,
     margin: [5, 20, 0, 0],
   },
   { image: "logo", width: 120, alignment: "right" },
 ],
 margin: [50, 25],
};
const footer = {
 columns: [
   { text: userName + ", " + timeStamp(), alignment: "left" },
   { text: "www.aneemo.com", alignment: "right" },
 ],
 margin: [50, 0],
 fontSize: 10,
};

// PDF Styles
const coolDarkGrey = "#374957";
const aneemoGreen = "#32bba6";
const styles = {
 heading: {
   fontSize: 22,
   bold: true,
   color: aneemoGreen,
   margin: [0, 25, 0, 10],
   lineHeight: 1.3,
 },
 p: {
   fontSize: 12,
   color: coolDarkGrey,
   alignment: "justify",
   margin: [0, 0, 0, 10],
   lineHeight: 1.3,
 },
 input: {
   fontSize: 11,
   color: "black",
   lineHeight: 1.3,
 },
};

// PDF content
const content = (heading, body, userText) => {
 const cont = [
   // Add title
   { text: heading.innerText, style: "heading" },
 ];
 // Add paragraphs from body
 $(body)
   .find("p")
   .each(function (index, p) {
     cont.push({ text: p.innerText, style: "p" });
   });
 // Add user input in a table
 cont.push({
   table: {
     widths: ["*"],
     heights: [300],
     body: [[{ text: userText, style: "input" }]],
   },
 });
 return cont;
};

// Define document
function docDef(userText) {
 return {
   content: content(wsHeading, wsBody, userText),
   styles: styles,
   images: images,
   header: header,
   footer: footer,
   pageMargins: pageMargins,
 };
}

function addWsHeading() {
 var wsHeading = document.createElement("h1");
 var wsIcon = document.createElement("i");
 wsIcon.classList.add("fa", "fa-pencil-square-o");
 wsHeading.innerText = " Worksheet";
 wsHeading.prepend(wsIcon);
 wsContainer.prepend(wsHeading);
}

// MAIN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//

//Add elements to document
addWsHeading();

// Generate pdf when save button clicked
$("#ws-save-btn").on("click", function () {
 const fName = fileName(date());
 const doc = docDef(wsUserText());
 pdfMake.createPdf(doc).download(fName);
});
$("#ws-dl-btn").on("click", function () {
 const fName = fileName(date());
 const doc = docDef("");
 pdfMake.createPdf(doc).download(fName);
});