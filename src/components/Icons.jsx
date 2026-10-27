// Figma'dagi chiziqli ikonkalar; rang currentColor orqali
const base = {fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round"};

const icon = (paths) =>
    function Icon({size = 20, className = ""}) {
        return <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>{paths}</svg>;
    };

export const SearchIcon = icon(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>);
export const CartIcon = icon(<><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.5L22 7H6"/></>);
export const UserPlusIcon = icon(<><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M19 8v6M16 11h6"/></>);
export const UserIcon = icon(<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>);
export const ChevronDown = icon(<path d="m6 9 6 6 6-6"/>);
export const ChevronLeft = icon(<path d="m15 6-6 6 6 6"/>);
export const ChevronRight = icon(<path d="m9 6 6 6-6 6"/>);
export const ArrowRight = icon(<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>);
export const CheckIcon = icon(<path d="m5 12 5 5L20 7"/>);
export const CloseIcon = icon(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>);
export const MenuIcon = icon(<><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>);
export const FilterIcon = icon(<><path d="M4 7h16"/><path d="M7 12h10"/><path d="M10 17h4"/></>);
export const PinIcon = icon(<><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></>);
export const PhoneIcon = icon(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>);
export const ClockIcon = icon(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>);
export const MailIcon = icon(<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>);
export const LogoutIcon = icon(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></>);
export const CustomizerIcon = icon(<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></>);
export const CarIcon = icon(<><path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v4h-2"/><path d="M5 17H3v-4h18"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></>);

export function TelegramIcon({size = 16}) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.6 2.9 10.8c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.4-1.5ZM9.8 14.6l-.4 4 -1.6-5 9.6-6.1-7.6 7.1Z"/></svg>;
}

export function FacebookIcon({size = 16}) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5H14Z"/></svg>;
}

export function InstagramIcon({size = 16}) {
    return <svg width={size} height={size} viewBox="0 0 24 24" {...base}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>;
}

export const SOCIAL_ICONS = {telegram: TelegramIcon, facebook: FacebookIcon, instagram: InstagramIcon};

export function PremiumIcon({size = 28}) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6">
            <circle cx="12" cy="9" r="6"/>
            <path d="m12 6 1 2.2 2.3.2-1.8 1.5.6 2.3-2.1-1.3-2.1 1.3.6-2.3-1.8-1.5 2.3-.2Z" fill="#fff"/>
            <path d="M8 14l-2 7 6-3 6 3-2-7"/>
        </svg>
    );
}
