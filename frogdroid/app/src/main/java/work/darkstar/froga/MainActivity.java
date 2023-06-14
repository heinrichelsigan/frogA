/*
 *
 * @author           Heinrich Elsigan
 * @version          V 1.0.1
 * @since            API 27 Oreo 8.1
 *
 * <p>frogA - frogger Android clone</p>
 *
 * <P>Coded 2023 by <a href="mailto:heinrich.elsigan@area23.at">Heinrich Elsigan</a>
 */
package work.darkstar.froga;

import android.annotation.SuppressLint;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.utils.widget.MotionLabel;
import androidx.core.content.res.ResourcesCompat;
import androidx.fragment.app.DialogFragment;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.media.Image;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;

import work.darkstar.froga.dialogfragment.FinishedLevel;
import work.darkstar.froga.dialogfragment.FinishedLevelPerfect;
import work.darkstar.froga.dialogfragment.GameOver;


public class MainActivity extends BaseActivity implements FinishedLevel.NoticeDialogListener, FinishedLevelPerfect.NoticeDialogListener,
        GameOver.NoticeDialogListener {
    /**
     * Whether or not the system UI should be auto-hidden after
     * {@link #AUTO_DELAY_MILLIS} milliseconds.
     */
    private static final boolean AUTO_HIDE = true;

    /**
     * If {@link #AUTO_HIDE} is set, the number of milliseconds to wait after
     * user interaction before hiding the system UI.
     */
    private static final int AUTO_DELAY_MILLIS = 500;

    volatile Integer syncLocker  = null;
    volatile int errNum = 0;

    DialogFragment dialogLevelFinished, dialogGameOver;

    LinearLayout[][] boardLayout;
    ImageView[] frogs;
    ImageView theFrog;
    View screenShot;
    LinearLayout frogFromLinearLayout, crashedFrogLayout0, crashedFrogLayout1;
    LinearLayout p0, p1, p2, p3, p4, p5, p6, p7, p8, p9;
    Drawable crashedFrogDrawable0, crashedFrogDrawable1;
    MotionLabel mLabelFrogCnt, mlabelLevel;

    HashMap<Integer, LinearLayout> allFields = new HashMap<>();
    HashMap<Integer,ImageView> allImages = new HashMap<>();

    char[] chArStreet0 = new char[3];
    char[] chArStreet1a = new char[3];
    char[] chArStreet1b = new char[4];
    char[] chArStreet4m = new char[3];
    char[] chArRiver0 = new char[4];
    char[] chArRiver1 = new char[4];
    int[] inGoal = new int[4];
    boolean frogCrashed, gameOver;
    int currenFrog = 9;
    int frogCoumter = 4;
    int goalCoumter = 0;
    int level = 0;
    String frogView = "s_", carView = "", walkView = "s_", riverString = "";
    String woodRiver0 = "e6", woodRiver1a = "c7", woodRiver1b = "g7";

    com.google.android.material.floatingactionbutton.FloatingActionButton fab;

    private final static Handler frogAlooperHandler = new Handler(Looper.getMainLooper());

    /**
     * frogAlooper new Runnable() -> { resetBackground(); }
     */
    private final Runnable frogAlooper = () -> froggerLooper();

    /**
     * startLevel inits a specific level for frogA
     *
     * @param lvl int to set level
     * @param visualHelp boolean when true to clear all previous settings
     * @return false
     */
    protected void startLevel(int lvl, boolean visualHelp) {
        level = lvl;
        if (level < 1) {
            setContentView(R.layout.activity_main);
            woodRiver0 = "e6";
            woodRiver1a = "c7";
            woodRiver1b = "g7";
        }
        if (level == 1) {
            setContentView(R.layout.activity_main_1);
            woodRiver0 = "c6";
            woodRiver1a = "d7";
            woodRiver1b = "f7";
        }
        if (level == 2) {
            setContentView(R.layout.activity_main_2);
            woodRiver0 = "a6";
            woodRiver1a = "a7";
            woodRiver1b = "h7";
        }
        if (level >= 3) {
            setContentView(R.layout.activity_main_3);
            woodRiver0 = "a6";
            woodRiver1a = "a7";
            woodRiver1b = "h7";
        }
        gameOver = false;
        frogCrashed = false;
        frogCoumter = 4;
        goalCoumter = 0;
        currenFrog = 9;
        theFrog = null;
        frogView = "s_";
        carView = "";
        mLabelFrogCnt = (MotionLabel) findViewById(R.id.frog_counter);
        mLabelFrogCnt.setText("frogs: " + frogCoumter);
        mlabelLevel = (MotionLabel) findViewById(R.id.mlabel_frog_level);
        mlabelLevel.setText(String.valueOf(level));

        screenShot = getWindow().getDecorView().getRootView();
        screenShot.setDrawingCacheEnabled(false);

        fab = (com.google.android.material.floatingactionbutton.FloatingActionButton)findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) { onCameraClick(screenShot);}
        });

        initLinearLayoutFields();
        initImageFields();
        initMoveLists();
        try {
            frogAlooperHandler.removeCallbacks(frogAlooper);
		} catch (Exception removingCallbackDelegateFailedEx) {
            showException(removingCallbackDelegateFailedEx);
		}
        froggerLooper();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        boardLayout = new LinearLayout[10][10];
        frogs = new ImageView[4];

        startLevel(0, true);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event){
        if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            panelFrogMoveClick(null, 1);
            return true;
        }
        if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            panelFrogMoveClick(null, 7);
            return true;
        }
        if (keyCode == KeyEvent.KEYCODE_POWER) {
            panelFrogMoveClick(null, 1);
        }
        return super.onKeyDown(keyCode,event);
    }


    /**
     * InitLinearLayoutFields assigns LinearLayout fields
     * to local variables boardLayout, stoneBoardLayouts, dropBoardLayouts
     * and fromFields, toFields
     * assigns all LinearLayout supu baord fields e.g. a0, a1, ..., a5, b0, b1, ..
     * to boardLayout[columnIndex][rowIndex]
     * a0 (a => 0) is mapped to boardLayout[0][0]
     * b2 (b => 1) is mapped to boardLayout[1][2]
     */
    private void initLinearLayoutFields() {

        // board mapping
        for (int c = 0; c < 10; c++) {
            char ch = ((char)(((int)'a') + c));

            for (int r = 0; r < 10; r++) {
                String rName = "";
                try {
                    rName = ch + String.valueOf(r);

                    int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                    boardLayout[c][r] = findViewById(rId);

                    if (!allFields.containsKey(rId)) {
                        allFields.put(rId, boardLayout[c][r]);
                    } else {
                        allFields.replace(rId, boardLayout[c][r]);
                    }

                } catch (Exception e) {
                    showMessage("Exception " + e.getMessage() + "\r\n" + "rname = " + rName + " c=" + c + " r=" + r);
                }
            }
        }
    }

    /**
     * Init all allImages = new HashMap<Integer, ImageView>();
     */
    private void initImageFields() {
        allImages.clear();

        p0 = (LinearLayout) findViewById(R.id.p0);
        p1 = (LinearLayout) findViewById(R.id.p1);
        p2 = (LinearLayout) findViewById(R.id.p2);
        p3 = (LinearLayout) findViewById(R.id.p3);
        p4 = (LinearLayout) findViewById(R.id.p4);
        p5 = (LinearLayout) findViewById(R.id.p5);
        p6 = (LinearLayout) findViewById(R.id.p6);
        p7 = (LinearLayout) findViewById(R.id.p7);
        p8 = (LinearLayout) findViewById(R.id.p8);

        if (p0 != null)
            p0.setOnClickListener(v -> panelFrogMoveClick(v, 0));
        if (p1 != null)
            p1.setOnClickListener(v -> panelFrogMoveClick(v, 1));
        if (p2 != null)
            p2.setOnClickListener(v -> panelFrogMoveClick(v, 2));
        if (p3 != null)
            p3.setOnClickListener(v -> panelFrogMoveClick(v, 3));
        if (p5 != null)
            p5.setOnClickListener(v -> panelFrogMoveClick(v, 5));
        if (p6 != null)
            p6.setOnClickListener(v -> panelFrogMoveClick(v, 6));
        if (p7 != null)
            p7.setOnClickListener(v -> panelFrogMoveClick(v, 7));
        if (p8 != null)
            p8.setOnClickListener(v -> panelFrogMoveClick(v, 8));

        frogs = new ImageView[4];
        frogs[0] = (ImageView) findViewById(R.id.frog0);
        frogs[1] = (ImageView) findViewById(R.id.frog1);
        frogs[2] = (ImageView) findViewById(R.id.frog2);
        frogs[3] = (ImageView) findViewById(R.id.frog3);

        try {
            for (int frg = 0; frg < 4; frg++) {
                String rName = "frog" + String.valueOf(frg);

                int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                frogs[frg] = (ImageView) findViewById(rId);
                frogs[frg].setTag(rName.toString());
                frogs[frg].setVisibility(View.VISIBLE);
                // gems[c][r].setVisibility(View.VISIBLE);

                if (!allImages.containsKey(rId))
                    allImages.put(rId, frogs[frg]);
                else
                    allImages.replace(rId, frogs[frg]);
            }
        }
        catch (Exception exi) {
            showException(exi);
            frogs[0] = (ImageView) findViewById(R.id.frog0);
            if (!allImages.containsKey(frogs[0].getId()))
                allImages.put(frogs[0].getId(), frogs[0]);
            else
                allImages.replace(frogs[0].getId(), frogs[0]);

            frogs[1] = (ImageView) findViewById(R.id.frog1);
            if (!allImages.containsKey(frogs[1].getId()))
                allImages.put(frogs[1].getId(), frogs[1]);
            else
                allImages.replace(frogs[1].getId(), frogs[1]);

            frogs[2] = (ImageView) findViewById(R.id.frog2);
            if (!allImages.containsKey(frogs[2].getId()))
                allImages.put(frogs[2].getId(), frogs[2]);
            else
                allImages.replace(frogs[2].getId(), frogs[2]);

            frogs[3] = (ImageView) findViewById(R.id.frog3);
            if (!allImages.containsKey(frogs[3].getId()))
                allImages.put(frogs[3].getId(), frogs[3]);
            else
                allImages.replace(frogs[3].getId(), frogs[3]);

        }
    }

    private void initMoveLists() {

        chArStreet0[0] = 'a';
        chArStreet0[1] = 'e';
        chArStreet0[2] = 'i';

        chArStreet1a[0] = 'b';
        chArStreet1a[1] = 'e';
        chArStreet1a[2] = (level == 0) ? 'i' : 'h';

        chArStreet1b[0] = 'b';
        chArStreet1b[1] = 'd';
        chArStreet1b[2] = 'g';
        chArStreet1b[3] = 'i';

        chArStreet4m[0] = 'a';
        chArStreet4m[1] = 'd';
        chArStreet4m[2] = 'g';

        chArRiver0[0] = 'f';
        chArRiver0[1] = 'g';
        chArRiver0[2] = 'h';
        chArRiver0[3] = 'i';

        chArRiver1[0] = 'b';
        chArRiver1[1] = 'c';
        chArRiver1[2] = 'g';
        chArRiver1[3] = 'h';

        inGoal[0] = 9;
        inGoal[1] = 9;
        inGoal[2] = 9;
        inGoal[3] = 9;

        int rId = getApplicationContext().getResources().getIdentifier("a1", "id", getApplicationContext().getPackageName());
    }


    /**
     * froggerLooper - loops all items in frogA
     */
    public void froggerLooper() {
        if (true) {
            int car0cnt = 0, car1cnt = 0, walkcnt = 0, river0cnt = 0, river1cnt = 0;
            ImageView car0 = null;
            ImageView car1 = null;
            ImageView walk0 = null;
            ImageView river0 = null;
            ImageView river1 = null;
            frogCrashed = false;
            if (crashedFrogLayout0 != null && crashedFrogDrawable0 != null) {
                crashedFrogLayout0.setBackground(crashedFrogDrawable0);
            }
            if (crashedFrogLayout1 != null && crashedFrogDrawable1 != null) {
                crashedFrogLayout1.setBackground(crashedFrogDrawable1);
            }
            crashedFrogDrawable0 = null;
            crashedFrogDrawable1 = null;
            crashedFrogLayout0 = null;
            crashedFrogLayout1 = null;
            boolean frogMovedWood = false;
            // if (dialogLevelFinished != null)
            //    showFinishedLevelDialog();
            // if (dialogGameOver != null && (frogCoumter <= 0)) {
            //    showGameOverDialog();

            for (Character carCh : chArStreet0)  {
                String rName = String.valueOf(carCh) + "1";
                int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                LinearLayout linCar0a = (LinearLayout)findViewById(rId);
                switch (car0cnt) {
                    case 0: car0 = (ImageView) findViewById(R.id.car0a);
                        break;
                    case 1:  car0 = (ImageView) findViewById(R.id.car0b);
                        break;
                    case 2: car0 = (ImageView) findViewById(R.id.car0c);
                        break;
                    default: car0 = null;
                        break;
                }

                if (car0 != null) {
                    Drawable car0Shape = getResources().getDrawable(R.drawable.car00, null);
                    car0.setImageDrawable(car0Shape);

                    if (linCar0a != null)
                        linCar0a.removeView(car0);

                    char ch0 = (char) ((int) carCh + 1);
                    if (ch0 != 'k')
                        chArStreet0[car0cnt] = ch0;
                    else {
                        chArStreet0[car0cnt] = 'a';
                        ch0 = 'a';
                    }

                    rName = String.valueOf(ch0) + "1";
                    rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                    LinearLayout linCar00a = (LinearLayout) findViewById(rId);

                    carView = ch0 + "1";
                    if (carView.equals(frogView)) {
                        try {
                            if (linCar00a != null) {
                                linCar00a.removeView(theFrog);

                                Drawable crashed0Shape = getResources().getDrawable(R.drawable.car0crashed, null);
                                car0.setImageDrawable(crashed0Shape);
                                // playCrash(true);
                                playL8rHandler.postDelayed(delayPlayCrash, 20);

                                frogCrashed = true;
                            }
                        } catch (Exception frogCrashException) {
                            showException(frogCrashException);
                        }
                    }

                    try {
                        if (linCar00a != null) {
                            car0.setTag(carView);
                            linCar00a.addView(car0);
                        }
                    } catch (Exception removingCallbackDelegateFailedEx) {
                          showException(removingCallbackDelegateFailedEx);
                    }
                }

                car0cnt++;
                car0cnt %= 3;
            }

            if (level < 2) {
                for (Character carCh1 : chArStreet1a) {
                    String rName = String.valueOf(carCh1) + "2";
                    int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                    LinearLayout linCar0b = (LinearLayout)findViewById(rId);
                    switch (car1cnt) {
                        case 0:
                            car1 = (ImageView) findViewById(R.id.car1a);
                            break;
                        case 1:
                            car1 = (ImageView) findViewById(R.id.car1b);
                            break;
                        case 2:
                            car1 = (ImageView) findViewById(R.id.car1c);
                            break;
                        default:
                            car1 = null;
                            break;
                    }

                    if (car1 != null) {
                        Drawable car1Shape = getResources().getDrawable(R.drawable.car11, null);
                        car1.setImageDrawable(car1Shape);

                        if (linCar0b != null)
                            linCar0b.removeView(car1);

                        char ch1 = (char) ((int) carCh1 - 1);
                        if ((int)ch1 == 96) {
                            chArStreet1a[car1cnt] = 'j';
                            ch1 = 'j';
                        }
                        else {
                            chArStreet1a[car1cnt] =  ch1;
                        }

                        rName = String.valueOf(ch1) + "2";
                        rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                        LinearLayout linCar11 = (LinearLayout) findViewById(rId);

                        carView =  ch1 + "2";
                        if (carView.equals(frogView)) {
                            try {
                                if (linCar11 != null) {
                                    playL8rHandler.postDelayed(delayPlayCrash, 40);
                                    frogCrashed = true;

                                    linCar11.removeView(theFrog);
                                    Drawable crashed1aShape = getResources().getDrawable(R.drawable.car1crashed, null);
                                    car1.setImageDrawable(crashed1aShape);
                                }
                            } catch (Exception frogCrashException) {
                                showException(frogCrashException);
                            }
                        }

                        try {
                            if (linCar11 != null) {
                                car1.setTag(carView);
                                linCar11.addView(car1);
                            }
                        } catch (Exception removingCallbackDelegateFailedEx) {
                            showException(removingCallbackDelegateFailedEx);
                        }
                    }

                    car1cnt++;
                }
            }
            else {
                for (Character carCh1 : chArStreet1b) {
                    String rName = String.valueOf(carCh1) + "2";
                    int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                    LinearLayout linCar0b = (LinearLayout) findViewById(rId);
                    switch (car1cnt) {
                        case 0:
                            car1 = (ImageView) findViewById(R.id.car1a);
                            break;
                        case 1:
                            car1 = (ImageView) findViewById(R.id.car1b);
                            break;
                        case 2:
                            car1 = (ImageView) findViewById(R.id.car1c);
                            break;
                        case 3:
                            car1 = (ImageView) findViewById(R.id.car1d);
                            break;
                        default:
                            car1 = null;
                            break;
                    }

                    if (car1 != null) {
                        Drawable car1Shape = getResources().getDrawable(R.drawable.car1, null);
                        car1.setImageDrawable(car1Shape);

                        if (linCar0b != null)
                            linCar0b.removeView(car1);

                        char ch1 = (char) ((int) carCh1 - 1);
                        if ((int) ch1 == 96) {
                            chArStreet1b[car1cnt] = 'j';
                            ch1 = 'j';
                        } else {
                            chArStreet1b[car1cnt] = ch1;
                        }

                        rName = String.valueOf(ch1) + "2";
                        rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                        LinearLayout linCar11 = (LinearLayout) findViewById(rId);

                        carView = String.valueOf(ch1) + "2";
                        if (carView.equals(frogView)) {
                            try {
                                if (linCar11 != null) {
                                    playL8rHandler.postDelayed(delayPlayCrash, 40);
                                    frogCrashed = true;

                                    linCar11.removeView(theFrog);
                                    Drawable crashed1bShape = getResources().getDrawable(R.drawable.car1crashed, null);
                                    car1.setImageDrawable(crashed1bShape);
                                }
                            } catch (Exception frogCrashException) {
                                showException(frogCrashException);
                            }
                        }

                        try {
                            if (linCar11 != null) {
                                car1.setTag(carView);
                                linCar11.addView(car1);
                            }
                        } catch (Exception removingCallbackDelegateFailedEx) {
                            showException(removingCallbackDelegateFailedEx);
                        }
                    }

                    car1cnt++;
                }
            }

            if (level > 0) {
                for (Character walkCh : chArStreet4m) {
                    String rmName = String.valueOf(walkCh) + "4";
                    int rmId = getApplicationContext().getResources().getIdentifier(rmName, "id", getApplicationContext().getPackageName());
                    LinearLayout linWalk0 = (LinearLayout) findViewById(rmId);
                    Drawable walk0Shape = null;
                    switch (walkcnt) {
                        case 0:
                            walk0 = (ImageView) findViewById(R.id.dog0);
                            walk0Shape = (level == 2) ?
                                    getResources().getDrawable(R.drawable.djinn0m, null) :
                                    getResources().getDrawable(R.drawable.street5m, null);
                            break;
                        case 1:
                            walk0 = (ImageView) findViewById(R.id.skateboard);
                            if (level == 1)
                                walk0Shape = getResources().getDrawable(R.drawable.street6m, null);
                            else if (level == 2)
                                walk0Shape = getResources().getDrawable(R.drawable.street4m, null);
                            else if (level >= 3)
                                walk0Shape = getResources().getDrawable(R.drawable.street5m, null);
                            break;
                        case 2:
                            walk0 = (ImageView) findViewById(R.id.dog1);
                            walk0Shape = (level == 3) ?
                                    getResources().getDrawable(R.drawable.dragon0m, null) :
                                    getResources().getDrawable(R.drawable.street5m, null);
                            break;
                        default:
                            walk0 = null;
                            break;
                    }

                    if (walk0 != null && walk0Shape != null) {

                        walk0.setImageDrawable(walk0Shape);

                        if (linWalk0 != null)
                            linWalk0.removeView(walk0);

                        char ch4 = (char) ((int) walkCh + 1);
                        if (ch4 != 'k')
                            chArStreet4m[walkcnt] = ch4;
                        else {
                            chArStreet4m[walkcnt] = 'a';
                            ch4 = 'a';
                        }

                        rmName = String.valueOf(ch4) + "4";
                        rmId = getApplicationContext().getResources().getIdentifier(rmName, "id", getApplicationContext().getPackageName());
                        LinearLayout linWalk4a = (LinearLayout) findViewById(rmId);

                        walkView = ch4 + "4";
                        if (walkView.equals(frogView)) {
                            try {
                                if (linWalk4a != null) {
                                    linWalk4a.removeView(theFrog);

                                    Drawable crashed0Shape = getResources().getDrawable(R.drawable.street7m, null);
                                    walk0.setImageDrawable(crashed0Shape);
                                    // playCrash(true);
                                    playL8rHandler.postDelayed(delayPlayCrash, 20);

                                    frogCrashed = true;
                                }
                            } catch (Exception frogCrashException) {
                                showException(frogCrashException);
                            }
                        }

                        try {
                            if (linWalk4a != null) {
                                walk0.setTag(walkView);
                                linWalk4a.addView(walk0);
                            }
                        } catch (Exception removingCallbackDelegateFailedEx) {
                            showException(removingCallbackDelegateFailedEx);
                        }
                    }

                    walkcnt++;
                    walkcnt %= 3;
                }
            }

            for (Character riverCh0 : chArRiver0)  {
                boolean frogWood0 = false;

                String rName = riverCh0 + "6";
                int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                LinearLayout linRiver0 = (LinearLayout)findViewById(rId);

                switch (river0cnt) {
                    case 0: river0 = (ImageView) findViewById(R.id.wood0a);
                        break;
                    case 1: river0 = (ImageView) findViewById(R.id.wood0b);
                        break;
                    case 2: river0 = (ImageView) findViewById(R.id.wood0c);
                        break;
                    case 3:  river0 = (ImageView) findViewById(R.id.wood0d);
                        break;
                    default: river0 = null;
                        break;
                }

                if (river0 != null) {
                    String riverString0 = riverCh0 + "6";
                    if (linRiver0 != null) {
                        if (frogView.equals(riverString0) && !frogMovedWood) {
                            linRiver0.removeView(theFrog);
                            frogWood0 = true;
                            frogMovedWood = true;
                        }
                        linRiver0.removeView(river0);
                    }

                   char ch3 = (char) ((int) riverCh0 + 1);
                    if ((int)ch3 == 'k') {
                        chArRiver0[river0cnt] = 'a';
                        ch3 = 'a';
                    }
                    else {
                        chArRiver0[river0cnt] =  ch3;
                    }

                    rName = ch3 + "6";
                    rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                    LinearLayout linRiver00 = (LinearLayout) findViewById(rId);

                    try {
                        if (linRiver00 != null) {
                            if (frogView.equals(rName) && !frogMovedWood) {
                                Drawable frogOnWood = getResources().getDrawable(R.drawable.wood1b, null);
                                theFrog.setImageDrawable(frogOnWood);
                                frogWood0 = false;
                                frogMovedWood = false;
                            }
                            if (frogWood0) {
                                frogView = ch3 + "6";;
                                frogWood0 = false;
                                Drawable frogOnWood0 = getResources().getDrawable(R.drawable.wood1b, null);
                                theFrog.setImageDrawable(frogOnWood0);
                                linRiver00.addView(theFrog);
                            }
                            linRiver00.addView(river0);

                        }
                    } catch (Exception riverException0) {
                        showException(riverException0);
                    }
                }

                river0cnt++;
            }

            for (Character riverCh1 : chArRiver1)  {
                String rName = String.valueOf(riverCh1) + "7";
                int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                LinearLayout linRiver1a = (LinearLayout)findViewById(rId);
                switch (river1cnt) {
                    case 0: river1 = (ImageView) findViewById(R.id.wood1a);
                        break;
                    case 1: river1 = (ImageView) findViewById(R.id.wood1b);
                        break;
                    case 2: river1 = (ImageView) findViewById(R.id.wood1c);
                        break;
                    case 3: river1 = (ImageView) findViewById(R.id.wood1d);
                        break;
                    default: river1 = null;
                        break;
                }

                if (river1 != null) {
                    boolean frogWood1 = false;
                    String riverString1 =  (char)riverCh1 + "7";
                    if (linRiver1a != null) {

                        if (frogView.equals(riverString1) && !frogMovedWood) {
                            linRiver1a.removeView(theFrog);
                            frogMovedWood = true;
                            frogWood1 = true;
                        }
                        linRiver1a.removeView(river1);
                    }

                    char ch4 = (char) ((int) riverCh1 - 1);
                    if ((int)ch4 == 96) {
                        chArRiver1[river1cnt] = 'j';
                        ch4 = 'j';
                    }
                    else {
                        chArRiver1[river1cnt] =  ch4;
                    }

                    rName = String.valueOf(ch4) + "7";
                    rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
                    LinearLayout linRiver11 = (LinearLayout) findViewById(rId);

                    try {
                        if (linRiver11 != null) {
                            if (frogView.equals(rName) && !frogMovedWood) {
                                Drawable frogOnWood1= getResources().getDrawable(R.drawable.wood1t, null);
                                theFrog.setImageDrawable(frogOnWood1);
                                frogWood1 = false;
                                frogMovedWood = false;
                            }
                            if (frogWood1) {
                                frogView = String.valueOf(ch4) + "7";;
                                frogWood1 = false;
                                Drawable frogOnWood = getResources().getDrawable(R.drawable.wood1t, null);
                                theFrog.setImageDrawable(frogOnWood);
                                linRiver11.addView(theFrog);
                            }
                            linRiver11.addView(river1);
                        }
                    } catch (Exception riverException1) {
                        showException(riverException1);
                    }
                }

                river1cnt++;
            }

            if (frogCrashed) {
                if (frogCrashedOrWhole(false))
                    return;
            }
            int delay = AUTO_DELAY_MILLIS;
            switch (level) {
                case 0: delay = 1750; break;
                case 1: delay = 1500; break;
                case 2: delay = 1250; break;
                case 3: delay = 1000; break;
                case 4: delay = 900; break;
                case 5: delay = 800; break;
                case 6: delay = 750; break;
                case 7: delay = 700; break;
                case 8: delay = 650; break;
                case 9: delay = 600; break;
                default:  delay = AUTO_DELAY_MILLIS; break;
            }
            try {
                frogAlooperHandler.postDelayed(frogAlooper, delay);;
            } catch (Exception removingCallbackDelegateFailedEx) {
                  showException(removingCallbackDelegateFailedEx);
            }
        }
    }

    /**
     * panelFrogMoveClick fired, on frog move arrow keys is pressed
     * @param view0 view on which arrow image was clicked
     * @param buttonDirection direction number for arrow button
     *                        0 ... up left
     *                        1 ... up
     *                        2 ... up right
     *                        3 ... left
     *                        5 ... right
     *                        6 ... down left
     *                        7 ... down
     *                        8 ... down right
     */
    protected void panelFrogMoveClick(View view0, int buttonDirection) {
        // Dropped, reassign View to ViewGroup
        View view = null;

        if (theFrog == null) {
            setTheNextFrog(currenFrog);
        }
        view = theFrog;

        String rName = frogView;
        int rId = getApplicationContext().getResources().getIdentifier(rName, "id", getApplicationContext().getPackageName());
        LinearLayout linFrog = (LinearLayout) findViewById(rId);

        ViewGroup owner = (ViewGroup) linFrog;

        String directionView = frogView;
        int row = (int) (frogView.charAt(1));
        char column = (char) frogView.charAt(0);

        switch (buttonDirection) {
            case 0:
                column = (char) frogView.charAt(0);
                if (column != 'a')
                    column = (char) ((int) (column) - 1);
                int rowb = ((int) Integer.parseInt(String.valueOf(frogView.charAt(1)))) + 1;
                directionView = column + String.valueOf(rowb);
                break;
            case 1:
                int rowa = (int) ((int) Integer.parseInt(String.valueOf(frogView.charAt(1)))) + 1;
                directionView = frogView.charAt(0) + String.valueOf(rowa);
                break;
            case 2:
                column = (char) frogView.charAt(0);
                if (column != 'j')
                    column = (char) ((int) (column) + 1);
                int rowc = (int) ((int) Integer.parseInt((String.valueOf(frogView.charAt(1))))) + 1;
                directionView = column + String.valueOf(rowc);
                break;
            case 3:
                column = (char) frogView.charAt(0);
                if (column != 'a')
                    column = (char) ((int) (column) - 1);
                directionView = String.valueOf(column) + frogView.charAt(1);
                break;
            case 5:
                column = (char) frogView.charAt(0);
                if (column != 'j')
                    column = (char) ((int) (column) + 1);
                directionView = String.valueOf(column) + frogView.charAt(1);
                break;
            case 6:
                column = (char) frogView.charAt(0);
                if (column != 'a')
                    column = (char) ((int) (column) - 1);
                int rowd = (int) ((int) Integer.parseInt(String.valueOf(frogView.charAt(1))));
                if (rowd != 0)
                    rowd--;
                directionView = column + String.valueOf(rowd);
                break;
            case 7:
                int rowe = (int) ((int) Integer.parseInt(String.valueOf(frogView.charAt(1))));
                if (rowe != 0)
                    rowe--;
                directionView = frogView.charAt(0) + String.valueOf(rowe);
                break;
            case 8:
                column = (char) frogView.charAt(0);
                if (column != 'j')
                    column = (char) ((int) (column) + 1);
                int rowf = (int) ((int) Integer.parseInt(String.valueOf(frogView.charAt(1))));
                if (rowf != 0)
                    rowf--;
                directionView = column + String.valueOf(rowf);
                break;
            default:
                break;
        }

        int rvId = getApplicationContext().getResources().getIdentifier(directionView, "id", getApplicationContext().getPackageName());
        LinearLayout container = (LinearLayout) findViewById(rvId);

        boolean frogInGoal = false;

        String viewDbgInfo = "";

        try {
            frogCrashed = false;
            frogView = (String) container.getTag().toString();
            owner.removeView(view);

            // frog at top to go to whole
            if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '9') {
                Drawable frogADrawable = getResources().getDrawable(R.drawable.froga, null);
                if (theFrog != null && frogADrawable != null)
                    theFrog.setImageDrawable(frogADrawable);
                switch (level) {
                    case 0:
                        if (frogView.equals("e9")) {
                            inGoal[goalCoumter++] = (int) currenFrog;
                            frogInGoal = true;
                        }
                        else frogCrashed = true;
                        break;
                    case 1:
                        if (frogView.equals("c9") || frogView.equals("g9")) {
                            inGoal[goalCoumter++] = (int) currenFrog;
                            frogInGoal = true;
                        }
                        else frogCrashed = true;
                        break;
                    case 2:
                        if (frogView.equals("c9") || frogView.equals("g9") || frogView.equals("e9")) {
                            inGoal[goalCoumter++] = (int) currenFrog;
                            frogInGoal = true;
                        }
                        else frogCrashed = true;
                        break;
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        if (frogView.equals("b9") || frogView.equals("d9") || frogView.equals("f9") || frogView.equals("h9")) {
                            inGoal[goalCoumter++] = (int) currenFrog;
                            frogInGoal = true;
                        }
                        else frogCrashed = true;
                        break;
                    default:
                        frogCrashed = true;
                        frogInGoal = false;
                        break;
                }
                if (frogCrashed) {
                    int uWtr1 = getApplicationContext().getResources().getIdentifier(frogView, "id", getApplicationContext().getPackageName());
                    crashedFrogLayout1 = (LinearLayout) findViewById(uWtr1);

                    Drawable waterCirclesDrawable1 = getResources().getDrawable(R.drawable.swamp1t, null);
                    if (crashedFrogLayout1 != null && waterCirclesDrawable1 != null)
                        crashedFrogLayout1.setBackground(waterCirclesDrawable1);
                    crashedFrogDrawable1 = getResources().getDrawable(R.drawable.swamp0t, null);
                    playL8rHandler.postDelayed(delayInWhole, 30);
                }
            }

            if (!frogInGoal) {
                // Frog lower street and car implementation
                if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '1') {
                    Drawable frogInStreet2b = getResources().getDrawable(R.drawable.street2b, null);
                    if (theFrog != null && frogInStreet2b != null)
                        theFrog.setImageDrawable(frogInStreet2b);
                    for (Character carCh0 : chArStreet0) {
                        String rrName = String.valueOf(carCh0) + "1";
                        int rrId = getApplicationContext().getResources().getIdentifier(rrName, "id", getApplicationContext().getPackageName());
                        LinearLayout linCar00 = (LinearLayout) findViewById(rrId);

                        carView = carCh0 + "1";
                        if (carView.equals(frogView)) {
                            frogCrashed = true;
                        }
                        if (frogCrashed) {
                            Drawable carCrash0 = getResources().getDrawable(R.drawable.car0crashed, null);
                            ImageView car0 = (ImageView) findViewById(R.id.car0a);
                            if (car0 != null && car0.getTag().toString().equals(frogView)) {
                                car0.setImageDrawable(carCrash0);
                            } else {
                                car0 = (ImageView) findViewById(R.id.car0b);
                                if (car0 != null && car0.getTag().toString().equals(frogView)) {
                                    car0.setImageDrawable(carCrash0);
                                } else {
                                    car0 = (ImageView) findViewById(R.id.car0c);
                                    if (car0 != null && car0.getTag().toString().equals(frogView)) {
                                        car0.setImageDrawable(carCrash0);
                                    }
                                }
                            }

                            // playCrash(true);
                            playL8rHandler.postDelayed(delayPlayCrash, 25);
                            break;
                        }
                    }
                }
                // Frog upper street and car implementation
                if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '2') {
                    Drawable frogInStreet2t = getResources().getDrawable(R.drawable.street2t, null);
                    if (theFrog != null && frogInStreet2t != null)
                        theFrog.setImageDrawable(frogInStreet2t);
                    if (level < 2) {
                        for (Character carCh1 : chArStreet1a) {
                            String rkName = String.valueOf(carCh1) + "2";
                            int rkId = getApplicationContext().getResources().getIdentifier(rkName, "id", getApplicationContext().getPackageName());
                            LinearLayout linCar11 = (LinearLayout) findViewById(rkId);

                            carView = carCh1 + "2";
                            if (carView.equals(frogView)) {
                                frogCrashed = true;
                            }
                            if (frogCrashed) {
                                Drawable carCrash = getResources().getDrawable(R.drawable.car1crashed, null);
                                ImageView car1 = (ImageView) findViewById(R.id.car1a);
                                if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                    car1.setImageDrawable(carCrash);
                                } else {
                                    car1 = (ImageView) findViewById(R.id.car1b);
                                    if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                        car1.setImageDrawable(carCrash);
                                    } else {
                                        car1 = (ImageView) findViewById(R.id.car1c);
                                        if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                            car1.setImageDrawable(carCrash);
                                        } else {
                                            car1 = (ImageView) findViewById(R.id.car1d);
                                            if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                                car1.setImageDrawable(carCrash);
                                            }
                                        }
                                    }
                                }

                                // playCrash(true);
                                playL8rHandler.postDelayed(delayPlayCrash, 25);
                                break;
                            }
                        }
                    } else {
                        for (Character carCh1 : chArStreet1b) {
                            String rkName = String.valueOf(carCh1) + "2";
                            int rkId = getApplicationContext().getResources().getIdentifier(rkName, "id", getApplicationContext().getPackageName());
                            LinearLayout linCar11 = (LinearLayout) findViewById(rkId);

                            carView = carCh1 + "2";
                            if (carView.equals(frogView)) {
                                frogCrashed = true;
                            }
                            if (frogCrashed) {
                                Drawable carCrash = getResources().getDrawable(R.drawable.car1crashed, null);
                                ImageView car1 = (ImageView) findViewById(R.id.car1a);
                                if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                    car1.setImageDrawable(carCrash);
                                } else {
                                    car1 = (ImageView) findViewById(R.id.car1b);
                                    if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                        car1.setImageDrawable(carCrash);
                                    } else {
                                        car1 = (ImageView) findViewById(R.id.car1c);
                                        if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                            car1.setImageDrawable(carCrash);
                                        } else {
                                            car1 = (ImageView) findViewById(R.id.car1d);
                                            if (car1 != null && car1.getTag().toString().equals(frogView)) {
                                                car1.setImageDrawable(carCrash);
                                            }
                                        }
                                    }
                                }

                                // playCrash(true);
                                playL8rHandler.postDelayed(delayPlayCrash, 25);
                                break;
                            }
                        }
                    }
                }

                if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '3') {
                    Drawable frogInMeadow2m = getResources().getDrawable(R.drawable.meadow2m, null);
                    if (theFrog != null && frogInMeadow2m != null)
                        theFrog.setImageDrawable(frogInMeadow2m);
                }

                if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '4') {
                    Drawable frogInStreet2m = getResources().getDrawable(R.drawable.street2m, null);
                    if (theFrog != null && frogInStreet2m != null)
                        theFrog.setImageDrawable(frogInStreet2m);

                    if (level > 0) {
                        for (Character walkCh : chArStreet4m) {
                            String rmName = String.valueOf(walkCh) + "4";
                            int rmId = getApplicationContext().getResources().getIdentifier(rmName, "id", getApplicationContext().getPackageName());
                            LinearLayout linWalk00 = (LinearLayout) findViewById(rmId);

                            walkView = walkCh + "4";
                            if (walkView.equals(frogView)) {
                                frogCrashed = true;
                            }
                            if (frogCrashed) {
                                Drawable walk0Crash = getResources().getDrawable(R.drawable.street7m, null);
                                ImageView walk0 = (ImageView) findViewById(R.id.dog0);
                                if (walk0 != null && walk0.getTag().toString().equals(frogView)) {
                                    walk0.setImageDrawable(walk0Crash);
                                } else {
                                    walk0 = (ImageView) findViewById(R.id.skateboard);
                                    if (walk0 != null && walk0.getTag().toString().equals(frogView)) {
                                        walk0.setImageDrawable(walk0Crash);
                                    } else {
                                        walk0 = (ImageView) findViewById(R.id.dog1);
                                        if (walk0 != null && walk0.getTag().toString().equals(frogView)) {
                                            walk0.setImageDrawable(walk0Crash);
                                        }
                                    }
                                }

                                // playCrash(true);
                                playL8rHandler.postDelayed(delayPlayCrash, 25);
                                break;
                            }
                        }
                    }
                }


                if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '5') {
                    Drawable frogInMeadow2t = getResources().getDrawable(R.drawable.meadow2t, null);
                    if (theFrog != null && frogInMeadow2t != null)
                        theFrog.setImageDrawable(frogInMeadow2t);
                }
                if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '8') {
                    Drawable frogInMeadow3t = getResources().getDrawable(R.drawable.meadow3t, null);
                    if (theFrog != null && frogInMeadow3t != null)
                        theFrog.setImageDrawable(frogInMeadow3t);
                }

                // frog on meadow implementation
                if (frogView != null && frogView.length() > 1 && frogView.charAt(1) == '0') {
                    Drawable frogOnStartMeadow = getResources().getDrawable(R.drawable.meadow6b, null);
                    theFrog.setImageDrawable(frogOnStartMeadow);
                }

                // Frog on wood implementation
                int river0cnt = 0, river1cnt = 0;
                ImageView river0 = null;
                ImageView river1 = null;
                if (frogView != null && frogView.charAt(1) == '6') {
                    frogCrashed = true;

                    for (Character riverCh0 : chArRiver0) {
                        String rzName = riverCh0 + "6";
                        int rzId = getApplicationContext().getResources().getIdentifier(rzName, "id", getApplicationContext().getPackageName());
                        LinearLayout linRiver0 = (LinearLayout) findViewById(rzId);
                        switch (river0cnt) {
                            case 0:
                                river0 = (ImageView) findViewById(R.id.wood0a);
                                break;
                            case 1:
                                river0 = (ImageView) findViewById(R.id.wood0b);
                                break;
                            case 2:
                                river0 = (ImageView) findViewById(R.id.wood0c);
                                break;
                            case 3:
                                river0 = (ImageView) findViewById(R.id.wood0d);
                                break;
                            default:
                                river0 = null;
                                break;
                        }

                        if (river0 != null) {
                            riverString = riverCh0 + "6";
                            if (riverString.equals(frogView)) {
                                Drawable frogOnWood0 = getResources().getDrawable(R.drawable.wood1b, null);
                                theFrog.setImageDrawable(frogOnWood0);
                                frogCrashed = false;
                            }
                        }
                    }
                    if (woodRiver0.equals(frogView) && frogCrashed) {
                        int rW0Id = getApplicationContext().getResources().getIdentifier(woodRiver0, "id", getApplicationContext().getPackageName());
                        LinearLayout linWood0 = (LinearLayout) findViewById(rW0Id);
                        woodRiver0 = "_";
                        Drawable wood0r = getResources().getDrawable(R.drawable.water0b, null);
                        if (linWood0 != null && wood0r != null) {
                            linWood0.setBackground(wood0r);
                        }
                        Drawable frogOnWood0a = getResources().getDrawable(R.drawable.wood2b, null);
                        theFrog.setImageDrawable(frogOnWood0a);
                        frogCrashed = false;
                    }
                    if (frogCrashed) {
                        int uWtr0 = getApplicationContext().getResources().getIdentifier(frogView, "id", getApplicationContext().getPackageName());
                        crashedFrogLayout0 = (LinearLayout) findViewById(uWtr0);
                        Drawable waterCirclesDrawable = getResources().getDrawable(R.drawable.wood3b, null);
                        if (crashedFrogLayout0 != null && waterCirclesDrawable != null)
                            crashedFrogLayout0.setBackground(waterCirclesDrawable);
                        crashedFrogDrawable0 = getResources().getDrawable(R.drawable.water0b, null);
                        // playUunderWater1(true);
                        playL8rHandler.postDelayed(delayUnderWater, 25);
                    }
                }

                if (frogView != null && frogView.charAt(1) == '7') {
                    frogCrashed = true;
                    for (Character riverCh1 : chArRiver1) {
                        String rwName = riverCh1 + "7";
                        int rwId = getApplicationContext().getResources().getIdentifier(rwName, "id", getApplicationContext().getPackageName());
                        LinearLayout linRiver1a = (LinearLayout) findViewById(rwId);
                        switch (river1cnt) {
                            case 0:
                                river1 = (ImageView) findViewById(R.id.wood1a);
                                break;
                            case 1:
                                river1 = (ImageView) findViewById(R.id.wood1b);
                                break;
                            case 2:
                                river1 = (ImageView) findViewById(R.id.wood1c);
                                break;
                            case 3:
                                river1 = (ImageView) findViewById(R.id.wood1d);
                                break;
                            default:
                                river1 = null;
                                break;
                        }

                        if (river1 != null) {
                            riverString = riverCh1 + "7";
                            if (riverString.equals(frogView)) {
                                Drawable frogOnWood1 = getResources().getDrawable(R.drawable.wood1t, null);
                                theFrog.setImageDrawable(frogOnWood1);
                                frogCrashed = false;
                            }
                        }
                    }

                    if (woodRiver1a.equals(frogView) && frogCrashed) {
                        int rW1aId = getApplicationContext().getResources().getIdentifier(woodRiver1a, "id", getApplicationContext().getPackageName());
                        LinearLayout linWood1a = (LinearLayout) findViewById(rW1aId);
                        woodRiver1a = "_";
                        Drawable wood1ar = getResources().getDrawable(R.drawable.water0t, null);
                        if (linWood1a != null && wood1ar != null) {
                            linWood1a.setBackground(wood1ar);
                        }
                        Drawable frogOnWood1a = getResources().getDrawable(R.drawable.wood2t, null);
                        theFrog.setImageDrawable(frogOnWood1a);
                        frogCrashed = false;
                    }
                    if (woodRiver1b.equals(frogView) && frogCrashed) {
                        int rW1bId = getApplicationContext().getResources().getIdentifier(woodRiver1b, "id", getApplicationContext().getPackageName());
                        LinearLayout linWood1b = (LinearLayout) findViewById(rW1bId);
                        woodRiver1b = "_";
                        Drawable wood1br = getResources().getDrawable(R.drawable.water0t, null);
                        if (linWood1b != null && wood1br != null) {
                            linWood1b.setBackground(wood1br);
                        }
                        Drawable frogOnWood1b = getResources().getDrawable(R.drawable.wood2t, null);
                        theFrog.setImageDrawable(frogOnWood1b);
                        frogCrashed = false;
                    }
                    if (frogCrashed) {
                        int uWtr1 = getApplicationContext().getResources().getIdentifier(frogView, "id", getApplicationContext().getPackageName());
                        crashedFrogLayout1 = (LinearLayout) findViewById(uWtr1);
                        Drawable waterCirclesDrawable1 = getResources().getDrawable(R.drawable.wood3t, null);
                        if (crashedFrogLayout1 != null && waterCirclesDrawable1 != null)
                            crashedFrogLayout1.setBackground(waterCirclesDrawable1);
                        crashedFrogDrawable1 = getResources().getDrawable(R.drawable.water0t, null);
                        // playUunderWater1(true);
                        playL8rHandler.postDelayed(delayUnderWater, 25);
                    }
                }
            }

        } catch (Exception ex) {
            showException(ex);
        }

        if (!frogCrashed) {
            if (view != null && container != null) {
                try {
                    container.addView(view, 0);
                    view.setVisibility(View.VISIBLE);
                } catch (Exception exView0) {
                    showException(exView0);
                    View uruzView = container.getChildAt(0);
                    ViewParent vParent = theFrog.getParent();
                    if (theFrog != null) {
                        container.addView(theFrog, 1);
                    }
                }
                // playJump(true);
                playL8rHandler.postDelayed(delayPlayJump, 25);
            }
            else {
                throw new NullPointerException("View view == theFrog is null");
            }
        }
        frogFromLinearLayout = container;

        frogCrashedOrWhole(frogInGoal);
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);

        // Trigger the initial hide() shortly after the activity has been
        // created, to briefly hint to the user that UI controls
        // are available.
        // showMessage("Not implemented yet ;) !");
    }

    protected boolean frogCrashedOrWhole(boolean frogInWhole) {
        if (frogCrashed || frogInWhole) {
            syncLocker = Integer.valueOf(Calendar.getInstance().getTime().getSeconds());
            synchronized (syncLocker) {
                theFrog = null;
                --frogCoumter;
                ++currenFrog;
                setTheNextFrog(currenFrog);
                mLabelFrogCnt.setText("frogs: " + frogCoumter);
            }
            if (frogInWhole) {
                if (level == 0 && goalCoumter == 1) {
                    showFinishedLevelDialog();
                }
                else if (level == 1 && goalCoumter == 2) {
                    showFinishedLevelDialog();
                }
                else if (level == 2 && goalCoumter == 3) {
                    showFinishedLevelDialog();
                }
                else if (level >= 3 && goalCoumter == 4) {
                    showFinishedLevelDialog();
                }
                else if (frogCoumter <= 0 || currenFrog == 4) {
                    showGameOverDialog();
                    return true;
                }
            }
            if (frogCrashed && (frogCoumter <= 0 || currenFrog == 4)) {
                showGameOverDialog();
                return true;
            }
        }
        return  false;
    }

    public void setTheNextFrog(int aCurrentFrog) {

        if (aCurrentFrog == 9 || aCurrentFrog == 10)
            aCurrentFrog = 0;

        if (aCurrentFrog == 0) {
            theFrog = (ImageView) findViewById(R.id.frog0);
            frogView = "d0";
            if (theFrog == null)
                aCurrentFrog = 1;
        }
        if (aCurrentFrog == 1) {
            theFrog = (ImageView) findViewById(R.id.frog1);
            frogView = "e0";
            if (theFrog == null)
                aCurrentFrog = 2;
        }
        if (aCurrentFrog == 2) {
            theFrog = (ImageView) findViewById(R.id.frog2);
            frogView = "f0";
            if (theFrog == null)
                aCurrentFrog = 3;
        }
        if (aCurrentFrog == 3) {
            theFrog = (ImageView) findViewById(R.id.frog3);
            frogView = "g0";
            if (theFrog == null)
                aCurrentFrog = 9;
        }

        currenFrog = aCurrentFrog;
    }

    /**
     * showGameOverDialog
     */
    public void showGameOverDialog() {
        if (!gameOver) {
            gameOver = true;
            playL8rHandler.postDelayed(delayScreenShotSound, 25);

            // Create an instance of the dialog fragment and show it
            dialogGameOver = new GameOver();
            Bundle dialogArgs = new Bundle();
            dialogArgs.putInt(getString(R.string.msg_perfect), 0);
            dialogArgs.putInt(getString(R.string.level_current), level);
            dialogGameOver.setArguments(dialogArgs);
            dialogGameOver.setCancelable(false);
            dialogGameOver.show(getSupportFragmentManager(), "GameOver");
        }
    }

    /**
     * showFinishedLevelPerfectDialog
     */
    public void showFinishedLevelPerfectDialog() {
        // Create an instance of the dialog fragment and show it
        dialogLevelFinished = new FinishedLevelPerfect();
        Bundle dialogArgs = new Bundle();
        dialogArgs.putInt(getString(R.string.msg_perfect), 1);
        dialogArgs.putInt(getString(R.string.level_current), level);
        dialogLevelFinished.setArguments(dialogArgs);
        dialogLevelFinished.setCancelable(false);
        dialogLevelFinished.show(getSupportFragmentManager(), "FinishedLevelPerfect");
    }

    /**
     * showFinishedLevelDialog
     */
    public void showFinishedLevelDialog() {
        int perfect = ((frogCoumter + goalCoumter) == 4) ? 1 : 0;
        if (perfect == 1) {
            showFinishedLevelPerfectDialog();
            return;
        }
        // Create an instance of the dialog fragment and show it
        dialogLevelFinished = FinishedLevel.newInstance(perfect, level);
        Bundle dialogArgs = new Bundle();
        dialogArgs.putInt(getString(R.string.msg_perfect), perfect);
        dialogArgs.putInt(getString(R.string.level_current), level);
        dialogLevelFinished.setArguments(dialogArgs);
        dialogLevelFinished.setCancelable(false);
        dialogLevelFinished.show(getSupportFragmentManager(), "FinishedLevel");
    }

    /**
     * onDialogPositiveClick - dialog OK clicked
     * @param dialog DialogFragment
     */
    @Override
    public void onDialogPositiveClick(DialogFragment dialog) {
        int nextLvl = (gameOver) ? 0 : level;
        if (!gameOver && nextLvl < 10)
            nextLvl++; // when not gameOver && level < 10

        String nxtLvlStr = getString(R.string.action_start) + " " +
                getString(R.string.next_level) +  " \"" + nextLvl + "\".";
        // showMessage(nxtLvlStr);

        if (dialogLevelFinished != null) {
            dialogLevelFinished.dismiss();
            dialogLevelFinished = null;
        }
        if (dialogGameOver != null) {
            dialogGameOver.dismiss();
            dialogGameOver = null;
        }
        startLevel(nextLvl, true);
    }

    /**
     * onDialogNegativeClick - dialog Cancel clicked
     * @param dialog DialogFragment
     */
    @Override
    public void onDialogNegativeClick(DialogFragment dialog) {
        String replayLvlStr = getString(R.string.replay_current_level) + ": " + level + ".";
        // showMessage(replayLvlStr);
        if (dialogLevelFinished != null) {
            dialogLevelFinished.dismiss();
            dialogLevelFinished = null;
        }
        if (dialogGameOver != null) {
            dialogGameOver.dismiss();
            dialogGameOver = null;
        }
        startLevel(level, true);
    }

    /**
     * onDialogNegativeClick - dialog Cancel clicked
     * @param dialog DialogFragment
     @Override
     public void onDialogCancel(DialogFragment dialog) {
        String replayLvlStr = getString(R.string.replay_current_level) + ": " + level + ".";
        showMessage(replayLvlStr);
        if (dialogLevelFinished != null) {
            dialogLevelFinished.dismiss();
            dialogLevelFinished = null;
        }
        if (dialogGameOver != null) {
            dialogGameOver.dismiss();
            dialogGameOver = null;
        }
        startLevel(level, true);
     }
     */
}