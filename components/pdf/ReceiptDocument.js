import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { COMPANY_NAME, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/contact';
import { serviceLabel } from '@/lib/services';

// Northbridge's own palette — do NOT reuse Colbis House's navy/blue/yellow.
const COLORS = {
  primary: '#BA0C2F',
  primaryDark: '#8F0924',
  tint: '#F6E3E7',
  ink: '#212529',
  muted: '#5B6770',
  success: '#1E8A4C',
};

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: COLORS.ink, fontFamily: 'Helvetica' },
  letterhead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
    paddingBottom: 12,
    marginBottom: 20,
  },
  companyName: { fontSize: 16, fontWeight: 700, color: COLORS.primaryDark, letterSpacing: 0.5 },
  companySub: { fontSize: 9, color: COLORS.muted, marginTop: 2 },
  docTitle: { fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: COLORS.primary, padding: '4 10', borderRadius: 3 },
  trackingNumber: { fontSize: 9, color: COLORS.muted, marginTop: 6, textAlign: 'right' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 10, fontWeight: 700, color: COLORS.primaryDark, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', marginBottom: 4 },
  label: { width: 150, color: COLORS.muted },
  value: { flex: 1, fontWeight: 700 },
  statusBadge: { fontSize: 9, fontWeight: 700, color: COLORS.success },
  statement: { fontSize: 10, lineHeight: 1.5, marginBottom: 14, color: COLORS.ink },
  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  signatureBlock: { width: '45%', borderTopWidth: 1, borderTopColor: COLORS.muted, paddingTop: 6, fontSize: 9, color: COLORS.muted },
  qrWrap: { alignItems: 'center', marginTop: 20 },
  qrImage: { width: 90, height: 90 },
  qrCaption: { fontSize: 8, color: COLORS.muted, marginTop: 4 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: COLORS.tint,
    paddingTop: 8,
    fontSize: 8,
    color: COLORS.muted,
    textAlign: 'center',
  },
});

function Letterhead({ docType, trackingNumber }) {
  return (
    <View style={styles.letterhead}>
      <View>
        <Text style={styles.companyName}>{COMPANY_NAME.toUpperCase()}</Text>
        <Text style={styles.companySub}>Security Services — Kampala, Uganda</Text>
      </View>
      <View>
        <Text style={styles.docTitle}>
          {docType === 'custody_receipt' ? 'CUSTODY RECEIPT' : 'SERVICE CONFIRMATION'}
        </Text>
        <Text style={styles.trackingNumber}>Tracking #: {trackingNumber}</Text>
      </View>
    </View>
  );
}

function Footer() {
  return (
    <Text style={styles.footer} fixed>
      {COMPANY_NAME} · {CONTACT_PHONE_DISPLAY} · {CONTACT_EMAIL}
    </Text>
  );
}

function QrBlock({ qrDataUrl }) {
  if (!qrDataUrl) return null;
  return (
    <View style={styles.qrWrap}>
      <Image src={qrDataUrl} style={styles.qrImage} />
      <Text style={styles.qrCaption}>Scan to check status online</Text>
    </View>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function CustodyReceipt({ record, client, qrDataUrl }) {
  const d = record.details || {};
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Letterhead docType="custody_receipt" trackingNumber={record.tracking_number} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Depositor</Text>
          <Row label="Full Name" value={client.full_name} />
          <Row label="Phone" value={client.phone} />
          <Row label="ID" value={`${client.id_type?.replace('_', ' ')} — ${client.id_number}`} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goods in Custody</Text>
          <Row label="Commodity / Description" value={d.commodity} />
          <Row label="Quantity" value={d.quantity} />
          <Row label="Declared Value" value={d.declared_value} />
          <Row label="Consignment Reference" value={d.consignment_ref} />
          <Row label="Charge Rate" value={d.charge_rate} />
          <Row label="Storage Start" value={d.storage_start_date} />
          <Row label="Storage End" value={d.storage_end_date} />
          <Row label="Release Authorised To" value={d.release_authorized_persons} />
          <Row label="Insurance Notes" value={d.insurance_notes} />
          <Row label="Current Status" value={record.status.replace('_', ' ')} />
        </View>

        <Text style={styles.statement}>
          The above-described goods have been received into {COMPANY_NAME}&apos;s custody under
          the terms agreed with the depositor at the time of registration. This receipt confirms
          custody only and does not constitute a valuation or insurance certificate unless
          separately stated above. Release of the goods will only be made to the person(s)
          authorised above, upon presentation of this receipt or the tracking number together with
          valid identification.
        </Text>

        <View style={styles.signatureRow}>
          <Text style={styles.signatureBlock}>Authorised Signature — {COMPANY_NAME}</Text>
          <Text style={styles.signatureBlock}>Company Stamp</Text>
        </View>

        <QrBlock qrDataUrl={qrDataUrl} />
        <Footer />
      </Page>
    </Document>
  );
}

const SUMMARY_FIELDS = {
  home_residential_security: [['property_address', 'Property Address'], ['property_type', 'Property Type'], ['duty_schedule', 'Duty Schedule'], ['guards_assigned', 'Guards Assigned'], ['start_date', 'Start Date'], ['special_instructions', 'Special Instructions']],
  corporate_commercial_security: [['premises_address', 'Premises Address'], ['premises_type', 'Premises Type'], ['duty_schedule', 'Duty Schedule'], ['entry_points_covered', 'Entry/Exit Points'], ['guards_assigned', 'Guards Assigned'], ['start_date', 'Start Date']],
  cctv_installation: [['site_address', 'Site Address'], ['camera_count', 'Number of Cameras'], ['coverage_areas', 'Coverage Areas'], ['system_type', 'System Type / Options'], ['install_date', 'Install Date'], ['maintenance_terms', 'Maintenance Terms']],
  security_escorts: [['goods_description', 'Goods / Assets'], ['origin', 'Origin'], ['destination', 'Destination'], ['escort_date', 'Escort Date'], ['personnel_assigned', 'Personnel Assigned'], ['vehicle_ref', 'Vehicle Ref.'], ['scope', 'Scope']],
  security_dogs: [['site_address', 'Site Address'], ['handler_assigned', 'Handler Assigned'], ['dog_ref', 'Dog Reference'], ['patrol_areas', 'Patrol Areas'], ['deployment_schedule', 'Deployment Schedule']],
};

export function ServiceConfirmation({ record, client, qrDataUrl }) {
  const d = record.details || {};
  const fields = SUMMARY_FIELDS[record.service_type] || [];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Letterhead docType="service_confirmation" trackingNumber={record.tracking_number} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client</Text>
          <Row label="Full Name" value={client.full_name} />
          <Row label="Phone" value={client.phone} />
          <Row label="ID" value={`${client.id_type?.replace('_', ' ')} — ${client.id_number}`} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{serviceLabel(record.service_type)}</Text>
          {fields.map(([key, label]) => (
            <Row key={key} label={label} value={d[key]} />
          ))}
          <Row label="Current Status" value={record.status.replace('_', ' ')} />
        </View>

        <Text style={styles.statement}>
          This document confirms the service particulars above as agreed between the client and{' '}
          {COMPANY_NAME}. Any change to schedule, personnel, or scope will be reflected in an
          updated confirmation. For questions about this service, quote the tracking number above.
        </Text>

        <View style={styles.signatureRow}>
          <Text style={styles.signatureBlock}>Authorised Signature — {COMPANY_NAME}</Text>
          <Text style={styles.signatureBlock}>Company Stamp</Text>
        </View>

        <QrBlock qrDataUrl={qrDataUrl} />
        <Footer />
      </Page>
    </Document>
  );
}

export function receiptDocumentFor(docType, props) {
  return docType === 'custody_receipt' ? <CustodyReceipt {...props} /> : <ServiceConfirmation {...props} />;
}
