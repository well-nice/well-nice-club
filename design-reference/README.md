# Design Reference

The exported Figma/React design bundle lives in:

`design-reference/finalize-cursor-app-design/`

Use this as the visual source of truth for the Well Nice Club app experience. The implementation should match the design direction closely, not merely borrow the general mood.

Priority files:

- `design-reference/finalize-cursor-app-design/src/app/App.tsx` - main prototype structure, screen content, interactions, and layout patterns.
- `design-reference/finalize-cursor-app-design/src/styles/theme.css` - design tokens and palette.
- `design-reference/finalize-cursor-app-design/src/imports/Well_Nice_Club_-_Specification.pdf` - product/design specification.
- `design-reference/finalize-cursor-app-design/src/imports/Well_Nice_Short_Mark.png` - short brand mark.
- `design-reference/finalize-cursor-app-design/src/imports/Well_Nice_Full_Mark__1_.png` - full brand mark.
- `design-reference/finalize-cursor-app-design/src/imports/*.png` - screenshot references.
- `design-reference/finalize-cursor-app-design/plans/i-am-building-an-rustling-puddle.md` - chosen visual direction notes.

Implementation rule:

Keep the production architecture intact: Clerk for auth, Stripe for payment, Payload for membership status and CMS. Use the design bundle to make `/join`, `/sign-up`, `/sign-in`, `/onboarding`, and `/app` feel like the prototype.
