import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { COMPANY_NAME, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/contact';
import { clientStatusLabel, serviceLabel } from '@/lib/services';

// Northbridge's own palette — mirrors app/styles/tokens.css so the PDF
// reads as the same product as the website. Do NOT reuse Colbis House's
// navy/blue/yellow.
const COLORS = {
  primary: '#BA0C2F',
  primaryDark: '#8F0924',
  tint: '#F6E3E7',
  ink: '#212529',
  muted: '#5B6770',
  surfaceMuted: '#F5F5F6',
  border: '#E3E3E3',
  success: '#1E8A4C',
  successTint: '#E3F3E9',
};

const STATUS_COLORS = {
  pending_assessment: { bg: '#FFF3CD', color: '#8A6D1B' },
  proposal_sent: { bg: '#E3ECFC', color: '#2E4F99' },
  agreed: { bg: '#E9E3FC', color: '#5B3FA0' },
  active: { bg: COLORS.tint, color: COLORS.primaryDark },
  completed: { bg: COLORS.successTint, color: COLORS.success },
  cancelled: { bg: '#EDEDED', color: '#6B6B6B' },
};

const styles = StyleSheet.create({
  page: { fontSize: 9.5, color: COLORS.ink, fontFamily: 'Helvetica' },
  topBar: { height: 6, backgroundColor: COLORS.primary },
  body: { padding: '24 36 36 36' },

  letterhead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  companyName: { fontSize: 15, fontWeight: 700, color: COLORS.primaryDark, letterSpacing: 0.4 },
  companyTagline: { fontSize: 7.5, color: COLORS.muted, letterSpacing: 0.6, marginTop: 3, textTransform: 'uppercase' },
  docTypeBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  docTypeBadgeText: { fontSize: 7.5, fontWeight: 700, color: COLORS.primaryDark, letterSpacing: 0.6, textTransform: 'uppercase' },
  letterheadRule: { height: 1, backgroundColor: COLORS.border, marginTop: 16, marginBottom: 20 },

  columns: { flexDirection: 'row' },
  leftCol: { flex: 1, paddingRight: 24 },

  sectionHeading: { marginBottom: 10 },
  sectionTitle: { fontSize: 8.5, fontWeight: 700, color: COLORS.primaryDark, textTransform: 'uppercase', letterSpacing: 0.8 },
  sectionRule: { width: 26, height: 2, backgroundColor: COLORS.primary, marginTop: 4 },
  section: { marginBottom: 18 },

  fieldGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  field: { width: '48%', marginBottom: 11 },
  fieldLabel: { fontSize: 7, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 },
  fieldValue: { fontSize: 9.5, fontWeight: 700, color: COLORS.ink },

  callout: { flexDirection: 'row', backgroundColor: COLORS.surfaceMuted, borderRadius: 4, padding: 12, marginBottom: 24 },
  calloutBar: { width: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginRight: 10 },
  calloutText: { flex: 1, fontSize: 8.5, lineHeight: 1.55, color: COLORS.ink },

  signatureRow: { flexDirection: 'row', justifyContent: 'space-between' },
  signatureBlock: { width: '47%' },
  signatureLine: { borderTopWidth: 1, borderTopColor: COLORS.muted, marginBottom: 6 },
  signatureCaption: { fontSize: 7.5, color: COLORS.muted },

  sidebar: {
    width: 150,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 8,
    padding: 14,
  },
  sidebarLabel: { fontSize: 7, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  sidebarDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 14 },
  statusPill: { alignSelf: 'flex-start', borderRadius: 10, paddingVertical: 4, paddingHorizontal: 9 },
  statusPillText: { fontSize: 8, fontWeight: 700, textTransform: 'capitalize' },
  trackingCode: { fontSize: 11.5, fontWeight: 700, color: COLORS.ink, letterSpacing: 0.3 },
  qrWrap: { alignItems: 'center' },
  qrImage: { width: 84, height: 84 },
  qrCaption: { fontSize: 7, color: COLORS.muted, marginTop: 6, textAlign: 'center' },
  issuedLabel: { fontSize: 7, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 },
  issuedValue: { fontSize: 8.5, color: COLORS.ink, fontWeight: 700 },

  footer: {
    position: 'absolute',
    bottom: 22,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    fontSize: 7.5,
    color: COLORS.muted,
    textAlign: 'center',
  },
});

const DOC_TYPE_LABEL = {
  custody_receipt: 'Custody Receipt',
  service_confirmation: 'Service Confirmation',
};

function Letterhead({ docType }) {
  return (
    <>
      <View style={styles.letterhead}>
        <View>
          <Text style={styles.companyName}>{COMPANY_NAME}</Text>
          <Text style={styles.companyTagline}>Security Services — Kampala, Uganda</Text>
        </View>
        <View style={styles.docTypeBadge}>
          <Text style={styles.docTypeBadgeText}>{DOC_TYPE_LABEL[docType]}</Text>
        </View>
      </View>
      <View style={styles.letterheadRule} />
    </>
  );
}

function SectionHeading({ title }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

function Field({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function Callout({ children }) {
  return (
    <View style={styles.callout}>
      <View style={styles.calloutBar} />
      <Text style={styles.calloutText}>{children}</Text>
    </View>
  );
}

function SignatureRow() {
  return (
    <View style={styles.signatureRow}>
      <View style={styles.signatureBlock}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureCaption}>Authorised Signature — {COMPANY_NAME}</Text>
      </View>
      <View style={styles.signatureBlock}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureCaption}>Company Stamp</Text>
      </View>
    </View>
  );
}

function Sidebar({ record, qrDataUrl }) {
  const statusColors = STATUS_COLORS[record.status] || STATUS_COLORS.pending_assessment;
  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarLabel}>Status</Text>
      <View style={[styles.statusPill, { backgroundColor: statusColors.bg }]}>
        <Text style={[styles.statusPillText, { color: statusColors.color }]}>
          {clientStatusLabel(record.status, record.service_type)}
        </Text>
      </View>

      <View style={styles.sidebarDivider} />

      <Text style={styles.sidebarLabel}>Tracking Number</Text>
      <Text style={styles.trackingCode}>{record.tracking_number}</Text>

      {qrDataUrl && (
        <>
          <View style={styles.sidebarDivider} />
          <View style={styles.qrWrap}>
            <Image src={qrDataUrl} style={styles.qrImage} />
            <Text style={styles.qrCaption}>Scan to verify status online</Text>
          </View>
        </>
      )}

      <View style={styles.sidebarDivider} />

      <Text style={styles.issuedLabel}>Issued</Text>
      <Text style={styles.issuedValue}>{new Date(record.created_at).toLocaleDateString()}</Text>
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

export function CustodyReceipt({ record, client, qrDataUrl }) {
  const d = record.details || {};
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <View style={styles.body}>
          <Letterhead docType="custody_receipt" />

          <View style={styles.columns}>
            <View style={styles.leftCol}>
              <View style={styles.section}>
                <SectionHeading title="Depositor" />
                <View style={styles.fieldGrid}>
                  <Field label="Full Name" value={client.full_name} />
                  <Field label="Phone" value={client.phone} />
                  <Field label="ID" value={`${client.id_type?.replace('_', ' ')} — ${client.id_number}`} />
                </View>
              </View>

              <View style={styles.section}>
                <SectionHeading title="Goods in Custody" />
                <View style={styles.fieldGrid}>
                  <Field label="Commodity / Description" value={d.commodity} />
                  <Field label="Quantity" value={d.quantity} />
                  <Field label="Declared Value" value={d.declared_value} />
                  <Field label="Consignment Reference" value={d.consignment_ref} />
                  <Field label="Charge Rate" value={d.charge_rate} />
                  <Field label="Storage Start" value={d.storage_start_date} />
                  <Field label="Storage End" value={d.storage_end_date} />
                  <Field label="Release Authorised To" value={d.release_authorized_persons} />
                  <Field label="Insurance Notes" value={d.insurance_notes} />
                </View>
              </View>

              <Callout>
                The above-described goods have been received into {COMPANY_NAME}&apos;s custody
                under the terms agreed with the depositor at the time of registration. This
                receipt confirms custody only and does not constitute a valuation or insurance
                certificate unless separately stated above. Release of the goods will only be
                made to the person(s) authorised above, upon presentation of this receipt or the
                tracking number together with valid identification.
              </Callout>

              <SignatureRow />
            </View>

            <Sidebar record={record} qrDataUrl={qrDataUrl} />
          </View>
        </View>
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
        <View style={styles.topBar} />
        <View style={styles.body}>
          <Letterhead docType="service_confirmation" />

          <View style={styles.columns}>
            <View style={styles.leftCol}>
              <View style={styles.section}>
                <SectionHeading title="Client" />
                <View style={styles.fieldGrid}>
                  <Field label="Full Name" value={client.full_name} />
                  <Field label="Phone" value={client.phone} />
                  <Field label="ID" value={`${client.id_type?.replace('_', ' ')} — ${client.id_number}`} />
                </View>
              </View>

              <View style={styles.section}>
                <SectionHeading title={serviceLabel(record.service_type)} />
                <View style={styles.fieldGrid}>
                  {fields.map(([key, label]) => (
                    <Field key={key} label={label} value={d[key]} />
                  ))}
                </View>
              </View>

              <Callout>
                This document confirms the service particulars above as agreed between the client
                and {COMPANY_NAME}. Any change to schedule, personnel, or scope will be reflected
                in an updated confirmation. For questions about this service, quote the tracking
                number on this document.
              </Callout>

              <SignatureRow />
            </View>

            <Sidebar record={record} qrDataUrl={qrDataUrl} />
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}

export function receiptDocumentFor(docType, props) {
  return docType === 'custody_receipt' ? <CustodyReceipt {...props} /> : <ServiceConfirmation {...props} />;
}
