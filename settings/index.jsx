function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Background Color</Text>}>
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: "#A0A0A0"}, // gray
            {color: "#B22222"}, // firebrick (dark red)
            {color: "#F83C40"}, // red
            {color: "#FF8E00"}, // orange
            {color: "#FFCC33"}, // yellow
            {color: "#90EE90"}, // mint
            {color: "#008000"}, // green
            {color: "#00CED1"}, // teal
            {color: "#1E90FF"}, // blue
            {color: "#0060C6"}, // indigo
            {color: "#9932CC"}, // purple
            {color: "#BA55D3"}, // magenta
            {color: "#EE82EE"}  // pink
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);