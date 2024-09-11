
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});

// Create PDF document component
const StatementPdf = ({ request }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>Asset Request Statement</Text>
      </View>
      <View style={styles.section}>
        <Text>Name: {request?.asset}</Text>
        <Text>Type: {request?.assetType}</Text>
        <Text>Requested Date: {request?.requestedDate}</Text>
        <Text>Approval Date: {request?.approvalDate}</Text>
        <Text>Status: {request?.status}</Text>
      </View>
    </Page>
  </Document>
);

export default StatementPdf;
