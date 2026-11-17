export const SERVICE_TYPES = [
  { value: 'home_residential_security', label: 'Home & Residential Security' },
  { value: 'corporate_commercial_security', label: 'Corporate & Commercial Security' },
  { value: 'cctv_installation', label: 'CCTV Installation' },
  { value: 'storage_of_valuables', label: 'Storage of Valuables' },
  { value: 'security_escorts', label: 'Security Escorts' },
  { value: 'security_dogs', label: 'Security Dogs' },
];

export const ID_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID' },
  { value: 'other', label: 'Other' },
];

export const STATUS_OPTIONS = [
  { value: 'pending_assessment', label: 'Pending Assessment' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'agreed', label: 'Agreed' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_CLIENT_LABEL = {
  pending_assessment: 'Registered',
  proposal_sent: 'Proposal Sent',
  agreed: 'Confirmed',
  active: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function clientStatusLabel(status, serviceType) {
  if (serviceType === 'storage_of_valuables') {
    if (status === 'active') return 'In Storage';
    if (status === 'completed') return 'Released';
  }
  return STATUS_CLIENT_LABEL[status] || status;
}

export function serviceLabel(v) {
  return SERVICE_TYPES.find((s) => s.value === v)?.label || v;
}

export function docTypeForService(v) {
  return v === 'storage_of_valuables' ? 'custody_receipt' : 'service_confirmation';
}

export const SERVICE_FIELDS = {
  storage_of_valuables: [
    { name: 'commodity', label: 'Commodity / Goods Description', type: 'text', required: true },
    { name: 'quantity', label: 'Quantity', type: 'text', required: true, placeholder: 'e.g. 1 sealed box, approx. 5 kg' },
    { name: 'declared_value', label: 'Declared Value (optional)', type: 'text' },
    { name: 'consignment_ref', label: 'Consignment / Storage Reference', type: 'text', required: true },
    { name: 'charge_rate', label: 'Charge Rate', type: 'text', required: true, placeholder: 'e.g. UGX 50,000 per week' },
    { name: 'storage_start_date', label: 'Storage Start Date', type: 'date', required: true },
    { name: 'storage_end_date', label: 'Storage End Date (set on release)', type: 'date' },
    { name: 'release_authorized_persons', label: 'Release Authorised To', type: 'text', placeholder: 'e.g. Depositor only, in person' },
    { name: 'insurance_notes', label: 'Insurance Notes (optional)', type: 'textarea' },
  ],
  home_residential_security: [
    { name: 'property_address', label: 'Property Address', type: 'text', required: true },
    { name: 'property_type', label: 'Property Type', type: 'text', required: true, placeholder: 'e.g. Private home, apartment, managed estate' },
    { name: 'duty_schedule', label: 'Duty Schedule', type: 'text', required: true, placeholder: 'e.g. 24-hour continuous coverage' },
    { name: 'guards_assigned', label: 'Guards Assigned', type: 'text', required: true, placeholder: 'e.g. 2 per shift' },
    { name: 'start_date', label: 'Service Start Date', type: 'date', required: true },
    { name: 'special_instructions', label: 'Special Instructions (optional)', type: 'textarea' },
  ],
  corporate_commercial_security: [
    { name: 'premises_address', label: 'Premises Address', type: 'text', required: true },
    { name: 'premises_type', label: 'Premises Type', type: 'text', required: true, placeholder: 'e.g. Office, shop, warehouse' },
    { name: 'duty_schedule', label: 'Duty Schedule', type: 'text', required: true },
    { name: 'entry_points_covered', label: 'Entry/Exit Points Covered', type: 'text' },
    { name: 'guards_assigned', label: 'Guards Assigned', type: 'text', required: true },
    { name: 'start_date', label: 'Service Start Date', type: 'date', required: true },
  ],
  cctv_installation: [
    { name: 'site_address', label: 'Site Address', type: 'text', required: true },
    { name: 'camera_count', label: 'Number of Cameras', type: 'text', required: true },
    { name: 'coverage_areas', label: 'Coverage Areas', type: 'text', placeholder: 'e.g. Entrance, compound, reception' },
    { name: 'system_type', label: 'System Type / Options', type: 'text', placeholder: 'e.g. Remote viewing, night vision, backup power' },
    { name: 'install_date', label: 'Install Date', type: 'date', required: true },
    { name: 'maintenance_terms', label: 'Maintenance Terms (optional)', type: 'textarea' },
  ],
  security_escorts: [
    { name: 'goods_description', label: 'Goods / Assets Description', type: 'text', required: true },
    { name: 'origin', label: 'Origin', type: 'text', required: true },
    { name: 'destination', label: 'Destination', type: 'text', required: true },
    { name: 'escort_date', label: 'Escort Date', type: 'date', required: true },
    { name: 'personnel_assigned', label: 'Personnel Assigned', type: 'text', required: true },
    { name: 'vehicle_ref', label: 'Vehicle Ref. (optional)', type: 'text' },
    { name: 'scope', label: 'Scope', type: 'text', placeholder: 'escort_only / transport / custody' },
  ],
  security_dogs: [
    { name: 'site_address', label: 'Site Address', type: 'text', required: true },
    { name: 'handler_assigned', label: 'Handler Assigned', type: 'text', required: true },
    { name: 'dog_ref', label: 'Dog Reference / Name', type: 'text', required: true },
    { name: 'patrol_areas', label: 'Patrol Areas', type: 'text' },
    { name: 'deployment_schedule', label: 'Deployment Schedule', type: 'text', required: true },
  ],
};
