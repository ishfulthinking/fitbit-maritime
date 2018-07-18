function SetSettings(props) {
  return (
    <Page>
      <Section title={<Text bold align="center">Clock Face Settings</Text>}>
        <Toggle
          settingsKey="toggle"
          label="Replace Distance with Floors"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SetSettings);