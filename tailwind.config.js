/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./lib/**/*.{js,ts,jsx,tsx}",
		"./hooks/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			'1xl': '1205px',
			xl: '1280px',
			'2xl': '1400px'
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
				lg: '2.5rem',
				xl: '3rem',
				'2xl': '4rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				'1xl': '1205px',
				xl: '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				/* ===== COMPATIBILITY - Legacy HSL Variables ===== */
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					hover: 'hsl(var(--card-hover))'
				},
				safety: {
					DEFAULT: 'hsl(var(--safety))',
					foreground: 'hsl(var(--safety-foreground))'
				},
				brand: {
					blue: 'hsl(var(--brand-blue))',
					orange: 'hsl(var(--brand-orange))',
					teal: 'hsl(var(--brand-teal))',
					navy: 'hsl(var(--brand-navy))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},

				/* ===== NAVY DESIGN SYSTEM - BACKGROUNDS & SURFACES ===== */
				'navy': {
					'base': 'var(--color-bg-base)',
					'card': 'var(--color-bg-card)',
					'elevated': 'var(--color-bg-elevated)',
					'hover': 'var(--color-bg-hover)',
					'surface': 'var(--color-bg-surface)',
				},

				/* ===== ELECTRIC CYAN (Primary Accent) ===== */
				'cyan': {
					'DEFAULT': 'var(--color-cyan)',
					'bright': 'var(--color-cyan-bright)',
					'deep': 'var(--color-cyan-deep)',
					'muted': 'var(--color-cyan-muted)',
				},

				/* ===== VIOLET (Secondary Accent) ===== */
				'violet': {
					'DEFAULT': 'var(--color-violet)',
					'light': 'var(--color-violet-light)',
					'glow': 'var(--color-violet-glow)',
				},

				/* ===== TEXT COLORS ===== */
				'text': {
					'primary': 'var(--color-text-primary)',
					'secondary': 'var(--color-text-secondary)',
					'muted': 'var(--color-text-muted)',
				},

				/* ===== CTA & ACTION COLORS ===== */
				'cta': {
					'DEFAULT': 'var(--color-cta)',
					'hover': 'var(--color-cta-hover)',
				},
				'success': 'var(--color-success)',
				'whatsapp': 'var(--color-whatsapp)',

				/* ===== BORDER COLORS ===== */
				'border-color': {
					'DEFAULT': 'var(--color-border)',
					'glow': 'var(--color-border-glow)',
					'cyan': 'var(--color-border-cyan)',
					'violet': 'var(--color-border-violet)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				/* ===== STANDARD SHADOWS ===== */
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
				'safety': 'var(--shadow-medium)',

				/* ===== GLOW EFFECTS ===== */
				'glow-cyan': 'var(--shadow-glow-cyan)',
				'glow-gold': 'var(--shadow-glow-gold)',
				'glow-violet': 'var(--shadow-glow-violet)',
				'lift-card': 'var(--shadow-lift-card)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--safety) / 0.3)' },
					'50%': { boxShadow: '0 0 30px hsl(var(--safety) / 0.6)' }
				},
				'scroll': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'net-float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotate(0deg)' 
					},
					'33%': { 
						transform: 'translateY(-10px) rotate(1deg)' 
					},
					'66%': { 
						transform: 'translateY(5px) rotate(-1deg)' 
					}
				},
				'rhombus-drift': {
					'0%': {
						backgroundPosition: '0 0, 24px 24px',
						opacity: '0.9',
						transform: 'translateZ(0) scale(1)'
					},
					'50%': {
						backgroundPosition: '8px -8px, 32px 16px',
						opacity: '1',
						transform: 'translate3d(4px, -3px, 0) scale(1.01)'
					},
					'100%': {
						backgroundPosition: '0 0, 24px 24px',
						opacity: '0.9',
						transform: 'translateZ(0) scale(1)'
					}
				}
			},
			animation: {
				'fade-in': 'fade-in 0.6s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'scroll': 'scroll 30s linear infinite',
				'net-float': 'net-float 20s ease-in-out infinite',
				'rhombus-drift': 'rhombus-drift 18s ease-in-out infinite'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			backgroundImage: {
				/* ===== SECTION BACKGROUNDS ===== */
				'section-bg-1': 'var(--gradient-section-bg-1)',
				'section-bg-2': 'var(--gradient-section-bg-2)',
				'section-bg-3': 'var(--gradient-section-bg-3)',
				'section-bg-4': 'var(--gradient-section-bg-4)',
				'section-bg-5': 'var(--gradient-section-bg-5)',
				'section-bg-6': 'var(--gradient-section-bg-6)',

				/* ===== HERO & GRADIENTS ===== */
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-cta-primary': 'var(--gradient-cta-primary)',
				'gradient-cta-cyan': 'var(--gradient-cta-cyan)',
				'gradient-accent-violet': 'var(--gradient-accent-violet)',

				/* ===== CARD BACKGROUNDS ===== */
				'card-default': 'var(--card-bg-default)',
				'card-cyan': 'var(--card-bg-cyan)',
				'card-violet': 'var(--card-bg-violet)',

				/* ===== IMAGE OVERLAYS ===== */
				'gradient-overlay-standard': 'var(--gradient-overlay-standard)',
				'gradient-overlay-fade': 'var(--gradient-overlay-fade)',
				'gradient-overlay-hero-slider': 'var(--gradient-overlay-hero-slider)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}