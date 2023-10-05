import {
    trigger, style, transition, animate, group, query, stagger
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        transition('in => out', [group([
            animate('300ms ease-in-out', style({
                'transform': 'translateY(-50%)',
            })),
            animate('300ms ease-in-out', style({
                'max-height': '0px',
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('300ms ease-in-out', style({
                'transform': 'translateY(0%)',
            })),
            animate('300ms ease-in-out', style({
                'max-height': '300px',
            }))
        ]
        )])
    ]),
];



export const listAnimation = trigger("listAnimation", [
    transition("* <=> *", [
        query(
            ":enter",
            [
                style({ opacity: 0 }),
                stagger(300, [animate("300ms", style({ opacity: 1, transform: 'scale(1)' }))])
            ],
            { optional: true }
        ),
    ])
]);

export const onOff = trigger('onOff', [
    transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('200ms', style({ opacity: 1, 'transform': 'translateY(-0%)' })),
    ]),
    transition(':leave', [
        animate('200ms', style({ opacity: 0, 'transform': 'translateY(-50%)' }))
    ])
]);

export const inOutVertical = trigger(
    'inOutVertical',
    [
        transition(
            ':enter',
            [
                style({ opacity: 0, bottom: '-60px' }),
                animate('400ms ease-out',
                    style({ opacity: 1, bottom: '0px' }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ opacity: 1, bottom: '0px' }),
                animate('400ms ease-in',
                    style({ opacity: 0, bottom: '-60px' }))
            ]
        )
    ]
);

export const inOutHorizontal = trigger(
    'inOutHorizontal',
    [
        transition(
            ':enter',
            [
                style({ opacity: 0, right: '-100px' }),
                animate('400ms ease-out',
                    style({ opacity: 1, right: '-0px' }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ opacity: 1, right: '0px' }),
                animate('400ms ease-in',
                    style({ opacity: 0, right: '-100px' }))
            ]
        )
    ]
)

